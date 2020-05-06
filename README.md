# Digital Art & Technology 2013 Graduate Showcase

Stripped-out "truly static" custom `nuxt generate`d site hosted via Cloudflare
Workers Site.

## Development

```shell
> yarn
> yarn dev
```

Run the commands listed above and open `http://localhost:3000/`.

NOTE: to install private GitHub registry packages under the `@saulhardman/*`
namespace you'll have to ask @saulhardman for a GitHub personal access token
with 'read' privileges (and then update your `.npmrc` accordingly).

## Deployment

Staging and Production environments have CI/CD GitHub Workflows on the `staging`
and `master` branches respectively.

Pushes to the `staging` branch will result in deploys to
`dat.coolkidscomputerclub.workers.dev`.

Pushes to the `master` branch will result in deploys to
`dat.coolkidscomputer.club`.

## History

Originally built in 2013 for the Digital Art & Technology Graduate Showcase at
the University of Plymouth. It began life as a Node.js Express application
hosted at `2013.digitalartandtechnology.co.uk`.

In 2016, the domain was left to expire and so @saulhardman migrated it to
`dat.coolkidscomputer.club` for posterity's sake.

In 2020, @saulhardman refactored the project to use a static site builder in
order to drop the dependency on a server.
