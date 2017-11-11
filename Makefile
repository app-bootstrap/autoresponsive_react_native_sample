npm_bin= $$(npm bin)

all: test
install:
	@npm install
start:
	@npm run start
clean:
	find ~/Library/Developer/Xcode -name autoresponsive_react_native_sample.app | xargs rm -rf
test: install build
	npm i macaca-ios --save-dev
	APP_PATH=${shell find ~/Library/Developer/Xcode -name autoresponsive_react_native_sample.app} ${npm_bin}/macaca run --verbose -d ./test
build:
	xcodebuild clean build -scheme autoresponsive_react_native_sample -configuration Debug -sdk iphonesimulator9.3 CODE_SIGNING_REQUIRED=NO CODE_SIGN_IDENTITY=""
test-android: install build-android
	npm i macaca-android --save-dev
	platform=android APP_PATH=./android/app/build/outputs/apk/app-debug.apk ${npm_bin}/macaca run --verbose -d ./test
build-android:
	cd android && chmod +x ./gradlew; ls -l gradlew; ./gradlew wrapper -v && ./gradlew clean assembleDebug --stacktrace
lint:
	@${npm_bin}/eslint
.PHONY: all test build
