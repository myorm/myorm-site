<code class="code">MyORM</code> is an object-relational mapping model created with the sense of favoring syntax and friendliness for library consumers over performance, 
although will still maintain performance as much as possible.
<br>
The syntax for <code class="code">MyORM</code> was made doable using complex TypeScript custom types combined with complex recursion and JavaScript 
<a class="code underline" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy">Proxies</a>.
<br>
JavaScript proxies are used to intercept almost every property reference within the library, utilizing property names to appropriately generate SQL statements, as well as
returning dynamically constructed types to assist with generating extremely complex SQL statements.
<br>
Thanks to the tool of JavaScript proxies, the possibility of making syntax similar to Microsoft's <a href="https://learn.microsoft.com/en-us/ef/core/" class="code underline">Entity Framework Core</a> was now doable, and
has been the intention of this library ever since the beginning.