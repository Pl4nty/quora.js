const cp = require('child_process');

console.log(cp.execSync('phantomjs ../intercept-xhr/biography.js ' + 'https://www.quora.com/profile/Thomas-Plant-1', (error, stdout, stderr) => {
    if (error) {
        throw error;
    }
    return stdout;
}).toString('ascii'));