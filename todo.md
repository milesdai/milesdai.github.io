# TODO

* Re-style projects page
* Implement related posts
* Google Analytics

### HTML to MD conversion

1. Change CRLF to LF
2. href link replacement
3. image replacement
4. Caption replacement
5. header replacement

href link replacement:
```
Find:     <a href="([^"]+)"[^>]*>([^<]+)</a>
Replace:  [$2]($1)
```

img replacement:
```
Find:   <a href="[^"]+" class="center">\n*<img src="([^"]+)" alt="([^"]+)"[^>]*>\n*</a>
Replace: ![$2](/assets/img/colorimeter/$1)
```

fix headers:
```
find:     \n*<h3>([^<]+)</h3>\n*
replace:  \n\n### $1\n\n
```

fix captions:
```
find:     <div class="caption">[\n ]*([^\n<]+)[ \n]*</div>
replace:  *$1*
```

clean up spacing:
```
find: \n[\n]+
replace: \n\n
```
