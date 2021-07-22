function loadJquery() {
    //<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    let body = document.querySelector('body'),
        scriptJquery = document.createElement('script'),
        hostedJquery = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
    
    scriptJquery.setAttribute('type', 'text/javascript');
    scriptJquery.setAttribute('src', hostedJquery);
    scriptJquery.addEventListener('load', function() {
        foo();
    });
    
    body.append(scriptJquery);
}
loadJquery();

function foo() {
    let urlAli = 'https://www.aliexpress.com/item/4001248898347.html', // Blocked
        urlAmazon = 'https://amzn.to/3gRrOnM', // Blocked
        urlDrop = 'https://drop.com/buy/akoustyx-r-220-iem?utm_source=linkshare&referer=95465S', // Blocked
        urlHeadphones = 'https://www.headphones.com/collections/moondrop/products/moondrop-aria-in-ear-monitor-headphones',
        urlHifigo = 'https://hifigo.com/collections/audiosense/products/audiosense-dt200-knowles-2-ba-two-tube-3d-printing-in-ear-earphones-iems',
        urlLinsoul = 'https://www.linsoul.com/collections/headphones-iems/products/cca-ckx',
        urlPenon = 'https://penonaudio.com/whizzer-a-he03.html',
        urlSza = 'https://shenzhenaudio.com/collections/softears/products/softears-rsv-rs5-5ba-iem-reference-sound-series-in-ear-monitor-earphone';
    
//    url = urlPenon;
//    getPrice('test phone', '$100', url, null);
}

function getPrice(phoneName, msrp, url, priceContainer) {
    //console.log(url);
    
    $.get(url, function(response) {
        let parsedHtml = jQuery.parseHTML(response),
            price = priceSet(parsedHtml);
        
        //console.log(parsedHtml);
        
        function priceSet(parsedHtml) {
            if (url.indexOf('hifigo.com') > -1) {
                let priceContainer = $(parsedHtml).find('span.money:contains("$")')[0],
                    priceText = priceContainer.innerText;

                return priceText;
            } else if (url.indexOf('linsoul.com') > -1) {
                let priceContainer = $(parsedHtml).filter('meta[property*="price"]')[0],
                    priceText = '$' + priceContainer.getAttribute('content');

                return priceText;
            } else if (url.indexOf('shenzhenaudio.com') > -1) {
                let priceContainer = $(parsedHtml).filter('meta[property*="price"]')[0],
                    priceText = '$' + priceContainer.getAttribute('content');

                return priceText;
            } else if (url.indexOf('headphones.com') > -1) {
                let priceContainer = $(parsedHtml).filter('meta[property*="price"]')[0],
                    priceText = '$' + priceContainer.getAttribute('content');

                return priceText;
            }
        }
        
        //console.log(phoneName + ': ' + priceText);
        let priceNum = parseInt(price.replace('$', '').replace(',','')),
            priceDetermination = (priceNum / msrp) < 0.81 ? 'deal' : 'standard';
        
        //console.log(phoneName + '\n' + 'MSRP: ' + msrp + '\n' + 'Price: ' + priceNum + '\n' + 'Ratio: ' + priceNum / msrp)
        
        if (priceContainer) {
            priceContainer.textContent = price;
            priceContainer.setAttribute('price', priceDetermination);
        } else {
            console.log('Test complete');
            console.log(price);
        }
        
    });
    
}
