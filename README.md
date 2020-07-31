# robiot
![Build, Quality, Test](https://github.com/Ca-Cybersecurity-Robiot/robiot/workflows/Build,%20Quality,%20Test/badge.svg)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e7d04395ccee48d5bcf0ed850cfc1078)](https://app.codacy.com/gh/Ca-Cybersecurity-Robiot/robiot?utm_source=github.com&utm_medium=referral&utm_content=Ca-Cybersecurity-Robiot/robiot&utm_campaign=Badge_Grade_Settings)


## API
**For run application :**
1. Run 
```
cd api/
docker-compose up -d
```
2. Run 

``
npm install
``

3. Run 

``
npm start
``

OR debug mode :

``
npm run watch-debug
``

## CLIENT
**For run application :**
1. Run 
```
cd client/
npm install
```

2. Run

``
npm start
``

End to end test :

``
npm run e2e
``

## Commons commands

Build application :

``
npm run build
``

Run unit test :

``
npm run test
``

Check update dependencies major :

``
npm run ncu
``

Check error lint :

``
npm run lint
``

auto-fix : 

``
npm run lint -- --fix
``
