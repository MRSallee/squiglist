function loadJquery() {
    //<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    let body = document.querySelector('body'),
        scriptJquery = document.createElement('script'),
        hostedJquery = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
    
    scriptJquery.setAttribute('type', 'text/javascript');
    scriptJquery.setAttribute('src', hostedJquery);
    scriptJquery.addEventListener('load', function() {
        foo()
    });
    body.append(scriptJquery);

}
loadJquery();

function foo() {
    console.log('jquery loaded');
//    scrapeSite();
    
    let price = scrapeSite();
    console.log(price);
}

function scrapeSite(pass) {
    let urlAli = 'https://www.aliexpress.com/item/4001248898347.html', // Blocked
        urlAmazon = 'https://amzn.to/3gRrOnM', // Blocked
        urlDrop = 'https://drop.com/buy/akoustyx-r-220-iem?utm_source=linkshare&referer=95465S', // Blocked
        urlHeadphones = 'https://www.headphones.com/collections/64-audio/products/64-audio-u18s',
        urlHifigo = 'https://hifigo.com/collections/audiosense/products/audiosense-dt200-knowles-2-ba-two-tube-3d-printing-in-ear-earphones-iems',
        urlLinsoul = 'https://www.linsoul.com/collections/headphones-iems/products/cca-ckx',
        urlSza = 'https://shenzhenaudio.com/collections/softears/products/softears-rsv-rs5-5ba-iem-reference-sound-series-in-ear-monitor-earphone',
        url = pass ? pass : urlLinsoul;
    
    $.get(url, function(response) {
        let parsedContent = jQuery.parseHTML(response);
        
        console.log(parsedContent);
        
        parsedContent.forEach(function(obj) {
            let objectType = obj.nodeName,
                objectAttributes = obj.attributes;
            
            if (objectType === 'META') {
                let property = objectAttributes[0].textContent,
                    want = 'og:price:amount';
                
                if (property === want) {
                    let content = objectAttributes[1].textContent;
                    
//                    return content;
                    console.log(content);
                }
            }
        });
    });
}
