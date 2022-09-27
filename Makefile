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

init-svn:
	mkdir -p svn
	cd svn && git svn --no-minimize-url -s -r2789429 clone https://plugins.svn.wordpress.org/near-access
	cd svn/near-access && git svn fetch --log-window-size 10000

commit:
	cp -r web3devs-near-access/* svn/near-access/
	cd svn/near-access/ && git add .
	cd svn/near-access/ && git commit
	cd svn/near-access/ && git svn rebase