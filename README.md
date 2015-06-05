# math-speech-rule-editor

a [Sails](http://sailsjs.org) application to edit rules for 
use by the [speech-rule-engine](https://github.com/zorkow/speech-rule-engine)

### Getting Started

The Speech Rule Editor is a [Sails](http://sailsjs.org) app that runs in a Vagrant-defined virtual machine.

Dependencies:

  - Vagrant and VirtualBox. See http://docs.vagrantup.com/v2/getting-started/index.html for installation instructions.

### Installation

```
git clone https://github.com/benetech/math-speech-rule-editor.git yourProjectName
cd yourProjectName
vagrant up
```

### Start App

```
vagrant ssh
cd /vagrant
sails lift
```

The app should be running at http://localhost:1337.