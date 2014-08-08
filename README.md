## autohost auth provider shell
This library complies with autohost v0.2.0's auth provider specification and is just missing code to integrate with a backing store.

This library currently supports basic, OAuth2 (bearer) and generic token authorization headers. If no authorization header is present, a basic challenge is present.

The bulk of the effort should be isolated to changing the store/db.js file only. If those operations can be retrofitted onto your storage technology, the rest of the model should work. Specs have been provided that should cover the majority (if not all) of the features. If the specs pass, you should be ready to start using it with autohost.

### config
The only real option here is setting `noSession` to true which will disable the session in the supported passport strategies.