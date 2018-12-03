This component showcases how to create a React based library
with the help of Emotion and Flow in the Quid UI repository.


### Bundling the package

To easily bundle the package, we make use of the microbundle tool,
which wraps Rollup, Babel and other useful utilities into a single CLI utility.
Read more about [microbundle][microbundle] on its official GitHub repository.

### Type checking

The whole Quid UI repository is type-checked using [Flow][flow],
you can start the Flow type checker by running `flow` on the root
of the Quid UI repository.


[microbundle]: https://github.com/developit/microbundle
[flow]: https://flow.org/
