# Material Toolkit

The Materials Toolkit allow developers to develop the assets necessary for rendering a client's website on the
Maximillian Workflows platform. The materials are where the client's web assets are defined.

## How does this work?

A Page in the context of Maximillian Workflows is an XML document that describe the layout of a web page. You can see
examples of this in the materials/pages directory. When rendering occurs, the elements within the Page file are replaced
with actual HTML, as defined in the materials/partials directory. It's these Partials that are the primary output of  
the client's materials.

The semantic Page files allow us to offer a richer set of UI elements than normal HTML, and in a machine
read-able format. This allows us to create an editor over the Semantic Pages that allow users to define
business processes using pages that describe what the user wants rather than how the page looks. Web design is
separated from business process design, allowing users who are business people to more efficiently develop
their business processes while not worrying about presentation.

What is required to make this all work are the Partials (the FTL templates), and other HTML assets including
images and stylesheets. This is the purpose of the Materials Toolkit. Each organisation has their own set of
materials that defines how their website looks.

Additionally, there are predefined Pages. These pages are not defined in the Editor, and not available to change
by normal users. They are defined here in the materials. They are mandatory and allow the platform to perform
standard features. Displaying the generic error page is a good example.

## Initial Setup

Every client's materials repo is a clone of this repo:

```
    https://github.com/robindevilliers/materials-toolkit.git
```

It's easier to Fork the repo.  Then from time to time, you can follow  the usual procedures for updating the repo
and updating the repo against the materials-toolkit.

However, you cannot fork within the same account.  For this to occur, we follow a different procedure.

The first thing you will want to do is create a repo on github. When you do, do not specify any additional
readme or licence files. The repo should be empty.  For example:  

```
    abc-materials
```

Clone the materials-toolkit into a local directory of the same name as the new repo you just created.

```
    git clone https://github.com/robindevilliers/materials-toolkit.git abc-materials
```

Then run the init_materials.sh script. This script will remove the origin remote and push to a new repo
that matches the name of the current directory. This will push the materials-toolkit into the new repo you just created.

```
    ./init_materials.sh
```

What you will end up with is a remote as so:

```
    $ git remote -v
    origin  https://github.com/robindevilliers/abc-materials.git (fetch)
    origin  https://github.com/robindevilliers/abc-materials.git (push)
```

And now you can make whatever changes are necessary.

From time to time, you will want to update the current repo against the original materials toolkit repo.

```
    ./rebase_materials.sh
```

This will add the original repo as a new remote and will rebase against it.

Remotes will look like this:

```
    $ git remote -v
    max     https://github.com/robindevilliers/materials-toolkit.git (fetch)
    max     https://github.com/robindevilliers/materials-toolkit.git (push)
    origin  https://github.com/robindevilliers/abc-materials.git (fetch)
    origin  https://github.com/robindevilliers/abc-materials.git (push)
```

## Installation

Once you have the repo cloned, you will  want to run up the toolkit.  First thing, install.

You must have npm installed.

This command will download and install any dependencies. 

```
npm install
```

## Build

This command will do a one of build and will build the assets for use in Production. You should do this when you are
sufficiently happy with any changes you have made and wish to deploy the materials to the Account.

```
npm run build
```

## Watch

This command will run the materials in developer mode. This command will setup a watching process which will re-build
the assets whenever any change is detected.

```
npm run watch
```

This last command will setup a webserver that will serve the built assets on this url:  http://127.0.0.1:8000

## Materials

The actual materials that are used by the platform are all in the materials directory.
