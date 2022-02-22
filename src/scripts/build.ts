import Script from '../core/script';
import utils from '../utils';
import webpack from 'webpack';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';
import {
  measureFileSizesBeforeBuild,
  OpaqueFileSizes,
  printFileSizesAfterBuild
} from 'react-dev-utils/FileSizeReporter';
import ServerConfigs from '../default/build/server';

export class Build extends Script {
  protected _name: string = 'NXT Build Script';
  protected _desc: string =
    'Script used to build NXT application (Server & Client)';
  protected WARN_AFTER_BUNDLE_GZIP_SIZE: number = 512 * 1024;
  protected WARN_AFTER_CHUNK_GZIP_SIZE: number = 1024 * 1024;

  public async init(): Promise<void> {
    process.env.NODE_ENV = 'production';
    process.on('unhandledRejection', (err) => {
      throw err;
    });

    measureFileSizesBeforeBuild(
      utils.nxt.resolvePathRelativeToProject('./build')
    )
      .then((previousFileSizes) => {
        utils.fileSystem.emptyDirectoryContent(
          utils.nxt.resolvePathRelativeToProject('./build')
        );
        return this.build(previousFileSizes);
      })
      .then(
        (result) => this.reportResult(result),
        (err) => {
          utils.generic.console.withColors('red').log('Failed to compile.\n');
          utils.generic.console.log((err.message || err) + '\n');
          process.exit(1);
        }
      );
  }

  protected build(previousFileSizes: OpaqueFileSizes): Promise<{
    stats: webpack.Stats | undefined;
    previousFileSizes: OpaqueFileSizes;
    warnings: string[];
  }> {
    utils.generic.console
      .withColors('blue')
      .log('\n\tCreating an optimized production build...\n');

    const clientCompiler = webpack(ServerConfigs);
    const serverCompiler = webpack(ServerConfigs);

    return new Promise((resolve, reject) => {
      clientCompiler.run((err, stats) => {
        if (err) {
          return reject(err);
        } else {
          utils.generic.console
            .withColors('white')
            .log('✓ Client webpack build complete');
        }

        serverCompiler.run((err) => {
          if (err) {
            return reject(err);
          } else {
            utils.generic.console
              .withColors('white')
              .log('✓ Server webpack build complete');
          }

          const messages = stats
            ? formatWebpackMessages(stats.toJson({}) as any)
            : {
                errors: [],
                warnings: []
              };

          if (messages.errors.length) {
            return reject(new Error(messages.errors.join('\n\n')));
          }

          resolve({
            stats,
            previousFileSizes,
            warnings: messages.warnings
          });
        });
      });
    });
  }

  protected reportResult(data: {
    stats: webpack.Stats | undefined;
    previousFileSizes: any;
    warnings: string[];
  }): void {
    const { stats, previousFileSizes, warnings } = data;
    if (warnings.length) {
      utils.generic.console
        .withColors('yellow')
        .log('Compiled with warnings.\n');
      utils.generic.console.log(warnings.join('\n\n'));
    } else {
      utils.generic.console.withColors('green').log('Compiled successfully.\n');
    }
    utils.generic.console.log('File sizes after gzip:\n');
    printFileSizesAfterBuild(
      stats as any,
      previousFileSizes,
      utils.nxt.resolvePathRelativeToProject('./build'),
      this.WARN_AFTER_BUNDLE_GZIP_SIZE,
      this.WARN_AFTER_CHUNK_GZIP_SIZE
    );
  }
}

export default () => (new Build()).init();