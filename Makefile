build:

	rm -rf web3devs-near-access/
	rm -rf web3devs-near-access.zip
	cp -r web3devs-near-access-src/ web3devs-near-access/
	rm -rf web3devs-near-access/.git
	mv web3devs-near-access/public/js/component/build web3devs-near-access/public/js/component.tmp
	rm -rf web3devs-near-access/public/js/component/
	mkdir web3devs-near-access/public/js/component/
	mv web3devs-near-access/public/js/component.tmp web3devs-near-access/public/js/component/build
	zip -r web3devs-near-access.zip web3devs-near-access/
