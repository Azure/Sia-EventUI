/*
Why does this exist?

Purely because ADAL assumes a
window object is available
at Require() time. When we
test on PhantomJS, no such
window is available, so this
module is designed to be Require()d
ahead of ADAL to provide it
with a window object to set
logging on so that no exception
is thrown before tests are run.

There is a code fix available
on the ADAL side, but they
have not yet released it to NPM,
so here we are.

Remove this file as soon as
ADAL itself is fixed.
*/

let shimStatement
if(typeof(window) !== 'undefined')
{
    shimStatement = ''
}
else
{
    shimStatement = 'var window = {location:{href:"http://localhost"}}; var chrome = {}'
}

var geval = eval //force eval to use global scope
geval(shimStatement)
