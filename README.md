![Thumbnail](https://i.imgur.com/qMkDvbE.png)
# Sukkomi🌸
An electron-based md editor based on Vite, Electron, React, Remark and CodeMirror.
## How to watch/deploy
`npm run watch` (Uses Vite)
## How to build
`npm run compile --openssl_fips=X` (on Windows you will need node-gyp with VSBuildTools 2019, Python 2.7)
(also to get vibrancy to work on windows I needed to use electron-acrylic-window module which misbehaves if not compiled with --openssl_fips=X)
