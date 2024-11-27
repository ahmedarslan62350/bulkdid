import pm2 from "pm2"

export function getPm2Logs(processName:any) {
  return new Promise((resolve, reject) => {
    pm2.connect((err:any) => {
      if (err) {
        reject(`Failed to connect to PM2: ${err.message}`);
        return;
      }

      pm2.describe(processName, (err:any, processDescription:any) => {
        pm2.disconnect();

        if (err) {
          reject(`Failed to get process description: ${err.message}`);
          return;
        }

        if (processDescription.length === 0) {
          reject(`No process found with name: ${processName}`);
          return;
        }

        const logFilePath = processDescription[0]?.pm2_env?.pm_out_log_path;
        resolve(logFilePath);
      });
    });
  });
}

