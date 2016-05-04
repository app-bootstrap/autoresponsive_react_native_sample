current_version = $$(git branch 2>/dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/')
npm_bin= $$(npm bin)

all: test
install:
	@npm install
start:
	@npm run start
clean:
	@rm -rf build
test: install lint
	@NODE_ENV=test $(BIN) $(FLAGS) \
		${npm_bin}/istanbul cover	${npm_bin}/_mocha --report lcovonly
travis: test start
	@${npm_bin}/macaca run --no-window
build:
	xcodebuild clean build -scheme autoresponsive_react_native_sample
lint:
	@${npm_bin}/eslint
.PHONY: test
