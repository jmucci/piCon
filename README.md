Setting up piCon on fresh Raspberry Pi
======================================

Much of this is based on [Headless Raspberry Pi Setup](https://hackernoon.com/raspberry-pi-headless-install-462ccabd75d0).

Prepare the pi SD card Operating System
---------------------------------------

- [Download](https://www.raspberrypi.org/downloads/raspbian/) RASPBIAN JESSIE **LITE** - Minimal image based on Debian Jessie *(assuming Windows computer)*

- **Save** the download file (similar to:  *2017-07-05-raspbian-jessie-lite.**zip***)

- **Unzip** the file to expose the **.img** file (*2017-07-05-raspbian-jessie-lite.**img***)


- **Write** the .img file to SD card using tool like [Win32 Disk Imager](https://sourceforge.net/projects/win32diskimager/) or [Etcher](https://etcher.io/)

- **Mount** the SD card.  Windows will assign a drive letter to the boot partition like *boot(E:)* for example.

- **Create 'ssh' file** in boot directory.  Create a new empty file (right-click > new > text document) - name it ‘ssh’ with no extension.  This will cue the pi boot to enable SSH so we can use [PuTTY](http://www.putty.org/) (an SSH and telnet client) session with the the pi. 

Booting the pi
--------------

- **Boot** the pi  with the prepared SD card with a **hard-wired ethernet connection**.

- [**Find**  pi's IP address](https://www.raspberrypi.org/documentation/remote-access/ip-address.md) (*like 192.168.86.223*)

- **PuTTY** to that address on port 22 - you may see security warnings ...

- **Sign-in** to the pi (*pi/raspberry*)

Set up Wifi connection
----------------------

**Add** the Wifi credentials

    sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
    -------------------------------------------------
	    network={
	        ssid="{wifi network}"
	        psk="{network password}"
	        key_mgmt=WPA-PSK
        }

   
   **Configure** DHCP

    sudo nano /etc/network/interfaces
    --------------------------------- 
    was: iface wlan0 inet manual
    change to: iface wlan0 inet dhcp

**Rename** the pi a {network name}

    sudo nano /etc/hostname 
    sudo nano /etc/hosts

**Reboot** the RPI (**without ethernet cable**) now on WiFi network

[**Find** the pi's IP address](https://www.raspberrypi.org/documentation/remote-access/ip-address.md) (*like 192.168.86.224*)
Consider reserving this address so that it persists using DHCP reservation.

PuTTY to that IP address on port 22

Install Software
----------------
 
**Update** the system's software

    sudo apt-get update
    sudo apt-get dist-upgrade


**Find** the pi's processor architecture
	
    cat /proc/cpuinfo
    # for pi0 - ARMv6
    # for pi3 - ARMv7
    # Node install is dependence on CPU architecture

**Install** [Node](https://nodejs.org/dist/latest/) Distribution

    $ cd ~        #home/pi
    
    # ###############################
    # for pi0 ARMv6: linux-armv6l
	# 
	
	$ wget https://nodejs.org/dist/latest/node-v8.4.0-linux-armv6l.tar.gz
    $ cd /usr/local
	$ sudo tar xzvf ~/node-v8.4.0-linux-armv6l.tar.gz --strip=1

    # ###############################
    # for pi3 ARMv7: linux-armv7l
    #
    
    $ wget https://nodejs.org/dist/latest/node-v8.4.0-linux-armv7l.tar.gz
    $ cd /usr/local
    $ sudo tar xzvf ~/node-v8.4.0-linux-armv7l.tar.gz --strip=1
	
	# test
	$ node -v   # v8.4
	$ npm -v    # 5.3.0
	

**Install** [Git](https://nodejs.org/dist/latest/), **Clone** and **Install** [piCon](https://github.com/jmucci/piCon) Software

    $ cd ~
    $ sudo apt-get install git

    $ cd picon
    $ git config core.filemode false  # so git ignores filemode changes
    $ npm install   # install dependency modules
    
**Install** python  and [rpi-rf package](https://pypi.python.org/pypi/rpi-rf) (RPi.GPIO) and **make scripts executable**

    $ cd ~
    $ sudo apt-get install python3
    $ sudo apt-get install python3-pip
    $ sudo pip3 install rpi-rf
    
	$ cd bin
	$ chmod +x bounceNode
    $ chmod +x rpi-rf_send
    

**Test** piCon server application

    $ cd ~/picon
    $ ./bin/bounceNode

**Install** samba file sharing
----------------------

    $ sudo apt-get install samba samba-common-bin
	$ sudo cp /dev/null /etc/samba/smb.conf   # clean out existing fluff
	$ sudo nano /etc/samba/smb.conf
	------------------------------------------
	[global]
	netbios name = {network name} # like piCon3-2 ! EDIT THIS FOR PARTICULAR MACHINE !
	server string = The Pi File Center
	workgroup = WORKGROUP
	hosts allow =
	socket options = TCP_NODELAY IPTOS_LOWDELAY SO_RCVBUF=65536 SO_SNDBUF=65536
	remote announce =
	remote browse sync =
	
	[piroot]
	path = /
	comment = No comment
	browsable = yes
	read only = no
	valid users =
	writable = yes
	guest ok = yes
	public = yes
	create mask = 0777
	directory mask = 0777
	force user = root
	force create mode = 0777
	force directory mode = 0777
	hosts allow =
	
	[pihome]
	path = /home/pi
	comment = No comment
	browsable = yes
	read only = no
	valid users =
	writable = yes
	guest ok = yes
	public = yes
	create mask = 0777
	directory mask = 0777
	force user = root
	force create mode = 0777
	force directory mode = 0777
	hosts allow =
	------------------------------------------
	$ sudo smbpasswd -a pi   # set share password
	$ sudo /etc/init.d/samba restart

**Map** Windows network drive
    File Explorer > Network > right-click > Map network drive
    Folder: \\{network name}\pihome
    Folder: \\{network name}\piroot


**Install** [ngrok](httpngrok.com/) tunneling. 
----------------------
Typically only for master (www facing) installs.

- [**Download** grok](https://ngrok.com/download) for Linux ARM 

- **Unzip** ngrok-stable-linux-arm.zip -> ngrok
- **Copy** ngrok to \pihome (via network share)

- [**Get** {authtoken}](https://dashboard.ngrok.com/auth)

- [**Get** / Create {subdomain}](https://dashboard.ngrok.com/reserved) 
Hint: {subdomain} == {network name}


	$ cd ~

	$ ./ngrok authtoken {authtoken}

	$ ./ngrok http -subdomain={subdomain} 8080 # test http://{subdomain}.ngrok.io/start


**Setup** piCon to boot automatically 

    $ cd ~
    $ sudo npm install forever --global
    $ crontab -e
    -------------------------------------
    ## to enable ngrok tunneling (only do for master (www facing) installs)
    # @reboot /home/pi/ngrok/ngrok http -{subdomain}=rpiHome 8080
    PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
    @reboot /usr/bin/forever start -m 5 -l forever.log -o out.log -e err.log -a /home/pi/picon/server.js


