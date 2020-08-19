deploy:
	@echo "installing dependencies"
	@npm install
	@echo "building app"
	@npm run build
	@echo "removing old version"
	@rm -r ~/static-files/hungry-vegan
	@echo "copying files"
	@mkdir ~/static-files/hungry-vegan
	@cp -r build/* ~/static-files/hungry-vegan/
	@echo "\033[0;32mDone! \033[0m"