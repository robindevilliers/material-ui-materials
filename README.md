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

It's easier to Fork the repo. Then from time to time, you can follow the usual procedures for updating the repo
and updating the repo against the materials-toolkit.

However, you cannot fork within the same account. For this to occur, we follow a different procedure.

The first thing you will want to do is create a repo on github. When you do, do not specify any additional
readme or licence files. The repo should be empty. For example:

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

## Installation

Once you have the repo cloned, you will want to run up the toolkit. First thing, install.

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

## Rebasing against the Maximillian Workflows Master

From time to time, you will want to update the current repo against the original materials toolkit repo. This is to
update this repo with bug fixes and new features.

This is the script to do so.

```
    ./rebase_materials.sh
```

This will add the original repo as a new remote and will rebase against it.

Remotes may look like this (origin urls will be your repo):

```
    $ git remote -v
    max     https://github.com/robindevilliers/materials-toolkit.git (fetch)
    max     https://github.com/robindevilliers/materials-toolkit.git (push)
    origin  https://github.com/robindevilliers/abc-materials.git (fetch)
    origin  https://github.com/robindevilliers/abc-materials.git (push)
```

You will very likely experience a conflict of some kind. When this occurs you must:

1. Fix the conflicts.
2. Test the conflict, by running **npm run start**, and viewing the output, or if the conflict is not a presentational
   artefact, resolve analytically.
3. Resolve any conflict on main.css, or other generated files by running: **npm run build**
4. Add these to the changes to accept: **git add --all**
5. Then execute **rebase --continue**, to continue the rebasing process.

You may from time to time rebase without experiencing an error. However, that does not mean you do not have a problem.
If some scss changes have been brought down that affects a change to the generated css files, and this does not generate
a conflict, then you will still have out-of-date css. You can test if this is the case by running **npm run build** and
see if your **main.css** file has been updated. If this is the case then:

1. Run **npm run build**.
2. See if main.css has been updated.
3. If main.css has been updated, **git add --all**
4. Commit changes.

After every rebase you will have to push the changes to your own repo and update the files on the servers.

1. And then push to your remote:  **git push -f**  (you will have to force push, as you have rebased)
2. Once this is done, email us at **support@maximillian-workflows**, and we will update your materials on the
   servers.
