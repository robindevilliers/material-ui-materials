# Material Toolkit

The Materials Toolkit allows web developers to develop the assets necessary for Maximillian Workflows to render Pages,
and Wizards on the platform.

How does this work? Maximillian Workflows defines a semantic format for web
pages. Web pages are defined in page.xml files as XML. You can see them in the &apos;pages&apos; directory. When
the platform needs to render a HTML page, it will walk through the XML document and replace each element with
the HTML equivalent. Each HTML Partial is defined in a FTL (freemarker) file and they reside in the &apos;partials&apos;
directory.

The Semantic Page files allow us to offer a richer set of UI elements than normal HTML, and in a machine
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

## Installation

You must have npm installed.

This command will download and install any dependencies. You only need to do this once.

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

## Updating Materials Toolkit code.

Everyone toolkit repo is a clone of this repo:

```
    https://github.com/robindevilliers/materials-toolkit.git
```

It is recommended that every account clones this repo and updates the assets within. When it comes time to update
the materials toolkit libraries, rebase against the original repo. This script will do this.

```
    ./rebase_materials.sh
```

This will do a rebase against the original materials toolkit and then replay all your subsequent changes on top.
This is recommended as you will be prompted to consider your specific repo changes in respect of the materials HEAD
version, which means you can ignore all the code changes that you don't care about within the toolkit.


