const { execSync } = require('child_process');

// const command = `adb shell "am start-foreground-service -a com.tcl.mpc.route --es config '"'{"feature_name":"accompany","moduleName":"accompany","mutex":false,"server":"10.120.19.17:8081","command":"start","loading_text":"准备中...","loading_text_style":{"colorStart":"#ff5e34","colorEnd":"#ffc52d","textSize":45},"initialProperties":"{}"}'"'"`;
const command = `adb shell am start-foreground-service -a com.tcl.mpc.route --es config '{"feature_name":"accompany","moduleName":"accompany"}'`;

const res = execSync(command);

console.log(res.toString());
