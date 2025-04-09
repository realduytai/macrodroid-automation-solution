
# macrodroid-automation-solution

- This project is automation testing solution for app MacroDroid applying WebdriverIO framework.
- Run on Nodejs environment.
- Major packages: WebdriverIO, selenium, appium, cucumber, allure-report...

Following guideline is only for macOS.

## Get Started

##### - Install nvm:

```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
```

You’ll find something added into .bash_profile, if you use zsh, add below line to ~/.zshrc
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

##### - Install node version and make it as default
```bash
nvm install v20.14.0
nvm use v20.14.0
nvm alias default v20.14.0
```

##### - Install dependencies:
```bash
npm install
```

You should be inside repo directory.
It will install dependencies only for this repository.

## Install Appium server desktop OR Appium server package
- Appium server desktop version `v1.22.1` from https://github.com/appium/appium-desktop/releases
- Appium server package version `v2.6.0` via cmd `npm install -g appium@2.6.0`

## Install Android Studio
- Install `Android Studio` from https://developer.android.com/studio
- Create a simulator with name `pixel-7-xl` (`Pixel 7 XL`, `Android API 33.0 x86_64`)
- Assign value `pixel-7-xl` to variable `ANDROID_DEVICE_NAME` of file `.env`

## Install Android SDK
The easiest way to install Android SDK is installing Android Studio. It will install Android SDK automatically.

## Install JAVA JDK
Install Java JDK [here](https://www.oracle.com/java/technologies/javase-downloads.html)

## Apply Path (Environment variables)

Open shell config file
```bash
vi ~/.zshrc
```

Add below lines into the shell config file
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm

#### Java
# Replace "21" by the version of Java JDK that installed in your machine  
export JAVA_HOME=`/usr/libexec/java_home -v 21`
export PATH=$JAVA_HOME/bin:$PATH

#### Android SDK
# Below is the default path, you can change them according to your installed directory 
export ANDROID_HOME=~/Library/Android/sdk
export PATH=$ANDROID_HOME/tools/bin:$PATH
export PATH=$ANDROID_HOME/emulator:$PATH
export PATH=$ANDROID_HOME/platform-tools:$PATH
```

After you finish adding the lines in shell config file, execute the following command:
```bash
source ~/.zshrc
```

## Trigger tests:

#### Start Appium server
```bash
appium server --use-driver=uiautomator2 --base-path=/wd/hub 
```

#### Run tests
```
npm run test -- --cucumberOpts.tags='@macro'
```