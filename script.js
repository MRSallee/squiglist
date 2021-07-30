
// Fill overlay with graph or video
function populateOverlay(type, url, phoneName) {
    let htmlOverlay = document.querySelector('aside.embed-overlay'),
        htmlOverlayLink = document.querySelector('aside.embed-overlay a'),
        htmlOverlayIframe = document.querySelector('iframe');

    htmlOverlay.setAttribute('data-overlay', 'off');

    if (type === 'video') {
        youtubeId = url.split('watch?v=').pop();
        link = 'https://www.youtube-nocookie.com/embed/' + youtubeId + '?playsinline=1';
        embedLink = link;
        
        // Analytics event
        pushEventTag('clicked_review', phoneName, '', 'user');
        
    } else if (type === 'frequency-response') {
        embedLink = url.replace('?share=', '?embed&share=')
        link = url;
        
        // Analytics event
        pushEventTag('clicked_fr', phoneName, '', 'user');
    } else {
        link = url;
        embedLink = link;
    }
    
    setTimeout(function() {
        htmlOverlay.setAttribute('data-overlay', 'on');
        htmlOverlay.setAttribute('data-embed-type', type);
        htmlOverlayLink.setAttribute('href', link);
        htmlOverlayIframe.setAttribute('src', embedLink);
    }, 100);
}

function closeOverlay() {
    let buttonOverlayClose = document.querySelector('button.overlay-close');
    
    buttonOverlayClose.addEventListener('click', function() {
        let htmlOverlay = document.querySelector('aside.embed-overlay'),
            htmlOverlayLink = document.querySelector('aside.embed-overlay a'),
            htmlOverlayIframe = document.querySelector('iframe');
        
        htmlOverlay.setAttribute('data-overlay', 'off');
        setTimeout(function() {
            htmlOverlayLink.setAttribute('href', '');
            htmlOverlayIframe.setAttribute('src', '');
        }, 500);
    });
}
closeOverlay();



// Favorites action
function clickedHeart(htmlModel, phoneName) {
    let hasFaves = localStorage.getItem('hasFaves'),
        body = document.querySelector('body');
    
    if (htmlModel.getAttribute('data-favorite') === 'true') {
        localStorage.removeItem(phoneName);
        htmlModel.setAttribute('data-favorite', 'false');
    } else {
        localStorage.setItem('hasFaves', 1)
        localStorage.setItem(phoneName, 1);
        htmlModel.setAttribute('data-favorite', 'true');
        
        if (!hasFaves) { body.setAttribute('first-fave', 'true'); }
        
        // Analytics event
        pushEventTag('clicked_favorite', phoneName, '', 'user');
    }
}


// Event for shop links
function clickedStore(store) {
    // Analytics event
    pushEventTag('clicked_store', phoneName, store, 'user');
}



// Load phones from JSON
function loadJson(sortMethod, sortChange) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    let jsonFilename = 'data.json?' + new Date().getTime(),
        jsonUrl = 'https://gsx2json.com/api?id=19ZKaK62HjH_gm7oMahN74hiR5nMqS1ifSrHloRIKfcg&sheet=2&columns=false';
    
    function handleData(data) {
        Object.entries(data.rows).forEach(function(item) {
            let phoneName = item[1].phonename,
                priceZone = item[1].pricezone,
                price = item[1].price,
                signature = item[1].signature === "V" ? "V-shape" : item[1].signature,
                score = item[1].score,
                linkReview = item[1].review,
                linkSquiglink = item[1].squiglink + ',Super_Review_Target',
                linkAmazon = item[1].amazon,
                linkAli = item[1].aliexpress,
                linkDrop = item[1].drop,
                linkHeadphonesdotcom = item[1].headphonesdotcom,
                linkHifigo = item[1].hifigo,
                linkLinsoul = item[1].linsoul,
                linkPenon = item[1].penonaudio,
                linkSza = item[1].shenzhenaudio,
                htmlTargetZone = document.querySelector('section.price-zone[zone="'+ priceZone +'"]'),
                htmlTargetStarsGroup = htmlTargetZone.querySelector('div.stars-grouping[group="'+ score +'"]'),
                htmlSortAlphabetical = document.querySelector('main.sort[sort-method="alphabetical"] section.sort-bucket'),
                htmlSortScore = document.querySelector('main.sort[sort-method="score"] section.sort-bucket[bucket="'+ score +'"]'),
                htmlSortSignature = document.querySelector('main.sort[sort-method="signature"] section.sort-bucket[bucket="'+ signature +'"]'),
                sectionFavorites = document.querySelector('section.favorites');
            
            let htmlModel = document.createElement('article'),
                htmlProductTop = document.createElement('div'),
                htmlRow1 = document.createElement('div'),
                htmlLeft1 = document.createElement('div'),
                htmlRight1 = document.createElement('div'),
                htmlModelName = document.createElement('h2'),
                htmlStars = document.createElement('div'),
                htmlStar1 = document.createElement('span'),
                htmlStar2 = document.createElement('span'),
                htmlStar3 = document.createElement('span'),
                htmlStar4 = document.createElement('span'),
                htmlStar5 = document.createElement('span'),
                htmlHeart = document.createElement('button'),
                htmlRow2 = document.createElement('div'),
                htmlLeft2 = document.createElement('div'),
                htmlRight2 = document.createElement('div'),
                htmlLinkSquiglink = document.createElement('a'),
                htmlLinkReview = document.createElement('a'),
                htmlPrice = document.createElement('div'),
                htmlProductBottom = document.createElement('div'),
                htmlRow3 = document.createElement('div');
            
            htmlModel.className = 'product-model';
            htmlProductTop.className = 'product-top';
            htmlRow1.className = 'row';
            htmlLeft1.className = 'left';
            htmlRight1.className = 'right';
            htmlModelName.className = 'model-name';
            htmlStars.className = 'stars';
            htmlHeart.className = 'heart';
            htmlRow2.className = 'row';
            htmlLeft2.className = 'left';
            htmlRight2.className = 'right';
            htmlLinkReview.className = 'link-review';
            htmlLinkSquiglink.className = 'link-squiglink';
            htmlPrice.className = 'price';
            htmlProductBottom.className = 'product-bottom';
            htmlRow3.className = 'row';
            
            htmlModel.append(htmlProductTop);
            htmlProductTop.append(htmlRow1)
            htmlRow1.append(htmlLeft1);
            htmlRow1.append(htmlRight1);
            htmlLeft1.append(htmlModelName);
            htmlLeft1.append(htmlStars);
            htmlStars.append(htmlStar1);
            htmlStars.append(htmlStar2);
            htmlStars.append(htmlStar3);
            htmlStars.append(htmlStar4);
            htmlStars.append(htmlStar5);
            htmlRight1.append(htmlHeart);
            htmlProductTop.append(htmlRow2);
            htmlRow2.append(htmlLeft2);
            htmlRow2.append(htmlRight2);
            htmlLeft2.append(htmlLinkReview);
            htmlLeft2.append(htmlLinkSquiglink);
            htmlRight2.append(htmlPrice);
            htmlModel.append(htmlProductBottom);
            
            function sortPhones(sortMethod) {
                //console.log('Sorting... \n' + phoneName + '\n' + signature);
                document.querySelector('body').setAttribute('sort-method', sortMethod);
                
                if (sortMethod === 'price-zones') {
                    htmlTargetStarsGroup.append(htmlModel);
                } else if (sortMethod === 'alphabetical') {
                    htmlSortAlphabetical.append(htmlModel);
                } else if (sortMethod === 'score') {
                    htmlSortScore.append(htmlModel);
                } else if (sortMethod === 'signature') {
                    htmlSortSignature.append(htmlModel);
                } else {
                    //console.log('Sort method not recognized');
                }
            }
            
            if (localStorage.getItem(phoneName)) {
                sectionFavorites.append(htmlModel);
                htmlModel.setAttribute('data-favorite', 'true');
            } else {
                sortPhones(sortMethod);
            }
            
            function addStoreLink(store, link) {
                let htmlRowStore = document.createElement('div'),
                    htmlLink = document.createElement('a'),
                    htmlLinkStore = document.createElement('span'),
                    htmlLinkPrice = document.createElement('span');
                
                htmlRowStore.className = 'row';
                htmlLink.className = 'link-store';
                htmlLinkStore.className = 'store-name';
                htmlLinkPrice.className = 'store-price';
                
                htmlRowStore.append(htmlLink);
                htmlLink.append(htmlLinkStore);
                htmlLink.append(htmlLinkPrice);
                htmlProductBottom.append(htmlRowStore);
                
                htmlLink.setAttribute('target', '_blank');
                htmlLink.setAttribute('href', link);
                htmlLinkStore.textContent = store;
                
                htmlLink.addEventListener('click', function() {
                    // Analytics event
                    pushEventTag('clicked_store', phoneName, store, 'user');
                });
            }
            
            if ( linkAmazon ) { addStoreLink('Amazon', linkAmazon); }
            if ( linkAli ) { addStoreLink('AliExpress', linkAli); }
            if ( linkDrop ) { addStoreLink('Drop', linkDrop); }
            if ( linkHeadphonesdotcom ) { addStoreLink('Headphones.com', linkHeadphonesdotcom); }
            if ( linkHifigo ) { addStoreLink('HiFiGo', linkHifigo); }
            if ( linkLinsoul ) { addStoreLink('Linsoul', linkLinsoul); }
            if ( linkPenon ) { addStoreLink('Penon Audio', linkPenon); }
            if ( linkSza ) { addStoreLink('Shenzhen Audio', linkSza); }
            
            addPromo(phoneName, htmlProductBottom);
            
            htmlModel.setAttribute('data-score', score);
            htmlModel.setAttribute('data-signature', signature);
            htmlModel.setAttribute('data-price-zone', priceZone);
            htmlModel.setAttribute('state', 'visible');
            htmlModelName.textContent = phoneName;
            htmlStars.setAttribute('data-score', score);
            if ( linkReview ) { htmlLinkReview.setAttribute('href', linkReview); htmlLinkReview.textContent = 'Review'; }
            htmlLinkSquiglink.setAttribute('href', linkSquiglink);
            htmlLinkSquiglink.textContent = signature;
            htmlPrice.textContent = price;
            
            htmlLinkReview.addEventListener('click', function(e) {
                populateOverlay('video', linkReview, phoneName);
                e.preventDefault();
            });
            
            htmlLinkSquiglink.addEventListener('click', function(e) {
                populateOverlay('frequency-response', linkSquiglink, phoneName);
                e.preventDefault();
            });
            
            htmlHeart.addEventListener('click', function() {
                clickedHeart(htmlModel, phoneName);
            });
            
            observeModel(item, htmlModel);
            
            //console.log('***** \n' + phoneName + '\n' + priceZone + '\n' + price + '\n' + signature + '\n' + score + '\n' + linkSquiglink + '\n' + linkAmazon + '\n' + linkAli + '\n' + linkDrop + '\n' + linkHeadphonesdotcom + '\n' + linkHifigo + '\n' + linkSza + '\n*****');
        });
        
        if (sortChange && false) {
            console.log('Scrolling');
            let htmlScrollToTarget = document.querySelector('section.sort-controls'),
                scrollTarget = window.pageYOffset + htmlScrollToTarget.getBoundingClientRect().top;

            window.scrollTo({
                top: scrollTarget,
                left: 0,
                behavior: 'smooth'
            });
        }
        filterByUrl();
    }
    
    fetch(jsonFilename)
    .then(response => {
        return response.json();
    })
    .then(data => handleData(data));
}
loadJson('price-zones', false);



// Observe model articles
function observeModel(phone, article) {
    let options = {
          root: null,
          rootMargin: '0px',
          threshold: 1.0
        },
        observer = new IntersectionObserver(callback, options);    
    
    observer.observe(article);
    article.setAttribute('observed', 'false');
    
    function callback(e) {
        let inView = e[0].intersectionRatio === 1 ? true : false,
            previouslyObserved = article.getAttribute('observed') === 'true' ? true : false,
            phoneName = phone[1].phonename,
            linkAmazon = phone[1].amazon,
            linkAli = phone[1].aliexpress,
            linkDrop = phone[1].drop,
            linkHeadphonesdotcom = phone[1].headphonesdotcom,
            linkHifigo = phone[1].hifigo,
            linkLinsoul = phone[1].linsoul,
            linkPenon = phone[1].penonaudio,
            linkSza = phone[1].shenzhenaudio,
            msrp = parseInt(phone[1].price.replace('$', '').replace(',',''));
        
        if (inView && !previouslyObserved) {
            //console.log(phoneName);
            article.setAttribute('observed', 'true');
            
            if (linkHeadphonesdotcom) {
                let priceContainer = article.querySelector('a[href*="headphones.com"] > span.store-price');
                
                priceContainer.setAttribute('price', 'fetching');
                getPrice(phoneName, msrp, linkHeadphonesdotcom, priceContainer);
            }
            
            if (linkHifigo) {
                let priceContainer = article.querySelector('a[href*="hifigo.com"] > span.store-price');
                
                priceContainer.setAttribute('price', 'fetching');
                getPrice(phoneName, msrp, linkHifigo, priceContainer);
            }
            
            if (linkLinsoul) {
                let priceContainer = article.querySelector('a[href*="linsoul.com"] > span.store-price');
                
                priceContainer.setAttribute('price', 'fetching');
                getPrice(phoneName, msrp, linkLinsoul, priceContainer);
            }
            
            if (linkSza) {
                let priceContainer = article.querySelector('a[href*="shenzhenaudio.com"] > span.store-price');
                
                priceContainer.setAttribute('price', 'fetching');
                getPrice(phoneName, msrp, linkSza, priceContainer);
            }
        }
    }
}



// Close welcome
function closeWelcomeInit() {
    let welcomeContainer = document.querySelector('section.top'),
        buttonCloseWelcome = document.querySelector('button.close-welcome'),
        storageWelcomeClosed = localStorage.getItem('welcomeClosed');
    
    if (storageWelcomeClosed) {
        welcomeContainer.setAttribute('closed', 'true');
    } else {
        buttonCloseWelcome.addEventListener('click', function() {
            welcomeContainer.setAttribute('closed', 'true');

            localStorage.setItem('welcomeClosed', 1);
        });
    }
}
// Welcome mat removed
//closeWelcomeInit();



// Header action
let altHeaderElem = document.querySelector('header.header')

altHeaderElem.addEventListener("click", function() {
    let headerLinksState = altHeaderElem.getAttribute("data-links");

    if (headerLinksState === "expanded") {
        altHeaderElem.setAttribute("data-links", "collapsed");
    } else {
        altHeaderElem.setAttribute("data-links", "expanded");
    }
});






// Sorting disabled for now
// Sort controls
function sortControls() {
    let sortSelect = document.querySelector('select#sort-select');
    
    sortSelect.addEventListener('change', function(e) {
        let sortMethod = e.target.value,
            productModels = document.querySelectorAll('article.product-model');
        
        productModels.forEach(function(model) {
            model.remove();
        });
            
        loadJson(sortMethod, true);
    });
}
//sortControls();

// Filter controls
function filterControlsInit() {
    let body = document.querySelector('body'),
        filtersOverlay = document.querySelector('aside.filter-controls'),
        filtersOverlayOpen = document.querySelector('button.filters');
    
    filtersOverlayOpen.addEventListener('click', function() {
        body.setAttribute('scroll-lock', 'on');
        filtersOverlay.setAttribute('data-overlay', 'on');
    });
    
    // Setting up filters variable
    filterGroups = document.querySelectorAll('div.filters');
    arrAllFilters = [];
    
    filterGroups.forEach(function(group) {
        let filterType = group.getAttribute('filter-type'),
            elemsFilters = group.querySelectorAll('button.filter-button'),
            objFilterSet = { 'filterType': filterType },
            arrSubFilters = [];
        
        objFilterSet.filters = arrSubFilters;
        arrAllFilters.push(objFilterSet);
        
        elemsFilters.forEach(function(filter) {
            let filterValue = filter.getAttribute('filter'),
                objFilter = {};
            
            objFilter.filterValue = filterValue;
            objFilter.filterState = 'visible';
            
            arrSubFilters.push(objFilter);
            
            // What to do when clicked
            filter.addEventListener('click', function() {
                let oldState = objFilter.filterState;
                
                updateFiltersData(objFilterSet, objFilter, filterType, filterValue, oldState);
                
            });
        });
    });
    
    let applyButton = document.querySelector('button.apply-filters');
    
    applyButton.addEventListener('click', function() {
        body.removeAttribute('scroll-lock');
        filtersOverlay.setAttribute('data-overlay', 'off');
    });
}
filterControlsInit();

// Update data state for filters
function updateFiltersData(objFilterSet, objFilter, filterType, filterValue, oldState) {
    let relatedFilters = objFilterSet.filters,
        noneHidden = relatedFilters.find(obj => obj.filterState === 'hidden') ? 'false' : 'true';
    
    if (noneHidden === 'true') {
        relatedFilters.forEach(function(filter) {
            filter.filterState = 'hidden';
        });
        
        objFilter.filterState = 'visible';
    } else {
        let newState = oldState === 'hidden' ? 'visible' : 'hidden';
        objFilter.filterState = newState;
    }
    
    let noneVisible = relatedFilters.find(obj => obj.filterState === 'visible') ? 'false' : 'true';
    
    if ( noneVisible === 'true' ) {
        relatedFilters.forEach(function(filter) {
            filter.filterState = 'visible';
        });
    }
    
    applyFiltersToDom(objFilter, filterType, filterValue, oldState);
}



// Update DOM state for filters
function applyFiltersToDom(objFilter, filterType, filterValue, oldState) {
    // Reset all product models to visible
    let allProductModels = document.querySelectorAll('article.product-model');
    allProductModels.forEach(function(model) {
        model.setAttribute('state', 'visible');
    });
    
    // Operate on each filter
    arrAllFilters.forEach(function(eachFilterSet) {
        let filterType = eachFilterSet.filterType,
            subFilters = eachFilterSet.filters;
        
        let elemFilterGroup = document.querySelector('div.filters[filter-type="'+ filterType +'"]');
        
        subFilters.forEach(function(eachFilter) {
            let filterValue = eachFilter.filterValue,
                filterState = eachFilter.filterState,
                elemFilterButton = elemFilterGroup.querySelector('button.filter-button[filter="'+ filterValue +'"]'),
                elemAllMatchingArticles = document.querySelectorAll('article.product-model[data-'+ filterType +'="'+ filterValue +'"]');
            
            // Set state on filter buttons
            elemFilterButton.setAttribute('state', filterState);
            
            // Set state on articles
            if (filterState === 'hidden') {
                elemAllMatchingArticles.forEach(function(article) {
                    article.setAttribute('state', filterState);
                });
            }
        });
    });
    
    let disabledFilters = document.querySelectorAll('button.filter-button[state="hidden"]').length,
        body = document.querySelector('body');
    
    if (disabledFilters) {
        body.setAttribute('filters-active', 'true');
    } else {
        body.removeAttribute('filters-active');
    }
    
    updateUrl(objFilter);
    setEmptyState();
}



// Search function
function searchInit() {
    let body = document.querySelector('body'),
        searchInput = document.querySelector('input.search'),
        filtersSection = document.querySelector('section.filters-button');
    
    // Handle search focus / defocus
    searchInput.addEventListener('focus', function() {
        searchInput.select();
        
        filtersSection.setAttribute('search-focus', 'true');
    });
        
    searchInput.addEventListener('blur', function() {
        let textLength = searchInput.value.length;
        
        filtersSection.setAttribute('search-focus', 'false');
        
        if (textLength) {
            filtersSection.setAttribute('search-content', 'true');
        } else {
            let allArticles = document.querySelectorAll('article.product-model');
            
            filtersSection.setAttribute('search-content', 'false');
            body.setAttribute('search-active', 'false');
            
            allArticles.forEach(function(article) {
                article.removeAttribute('search');
            });
        }
    });
        
    searchInput.addEventListener('keyup', function(e) {
        if (e.keyCode === 13 || e.keyCode === 27) {
            searchInput.blur();
        }
    });
    
    // Process search input
    searchInput.addEventListener('input', function(e) {
        let searchText = searchInput.value.toLowerCase(),
            allArticles = document.querySelectorAll('article.product-model'),
            allPriceZones = document.querySelectorAll('section.price-zone');
        
        if (searchText) {
            body.setAttribute('search-active', 'true');
        } else {
            body.setAttribute('search-active', 'false');
        }
        
        allArticles.forEach(function(article) {
            let phoneName = article.querySelector('h2.model-name').textContent.toLowerCase();
            
            if (phoneName.includes(searchText)) {
                article.setAttribute('search', 'hit');
            } else {
                article.setAttribute('search', 'miss');
            }
        });
        
        setEmptyState();
        
        updateUrl();
    });
}
searchInit();



// Update URL to reflect filters
function updateUrl() {
    let baseUrl = window.location.href.split('?').shift(),
        title = document.querySelector('title').textContent,
        filterStrings = [];
    
    let searchActive = document.querySelector('body').getAttribute('search-active') === 'true' ? true : false;
    
    arrAllFilters.forEach(function(filterSet) {
        let filterType = filterSet.filterType,
            setFilters = filterSet.filters,
            noneHidden = setFilters.find(obj => obj.filterState === 'hidden') ? 'false' : 'true';
        
        if (noneHidden === 'true') {
            //console.log('None hidden');
        } else {
            let activeFilters = [];
            
            setFilters.forEach(function(filter) {
                let filterValue = filter.filterValue,
                    filterState = filter.filterState;
                
                if (filterState === 'visible') {
                    activeFilters.push(filterValue);
                }
            });
            
            let filterString = filterType + '=' + activeFilters.join(),
                filterStringSafe = filterString.replaceAll(' ', '_');
            
            filterStrings.push(filterStringSafe);
        }
    });
    
    let searchText = searchActive ? document.querySelector('input.search').value.replaceAll(' ', '_') : false,
        searchAppendage = searchText ? 'search=' + searchText : false,
        filtersAppendage = filterStrings.length ? filterStrings.join('&') : null,
        urlAppendage = filtersAppendage,
        newUrl = filterStrings.length ? baseUrl + '?' + urlAppendage : baseUrl;
    
    if (searchAppendage && filtersAppendage) {
        let urlAppendage = filtersAppendage + '&' + searchAppendage,
            newUrl = baseUrl + '?' + urlAppendage;
        
        window.history.replaceState(null, title, newUrl);
    } else if (searchAppendage) {
        let urlAppendage = searchAppendage,
            newUrl = baseUrl + '?' + urlAppendage;
        
        window.history.replaceState(null, title, newUrl);
    } else if (filtersAppendage) {
        let urlAppendage = filtersAppendage,
            newUrl = baseUrl + '?' + urlAppendage;
        
        window.history.replaceState(null, title, newUrl);
    } else {
        let newUrl = baseUrl;
        
        window.history.replaceState(null, title, newUrl);
    }
}

// Read filters from URL
function filterByUrl() {
    let openedUrl = window.location.href,
        urlContainsParams = openedUrl.indexOf('?') > -1 ? true : false;
    
    if (urlContainsParams) {
        let params = openedUrl.split('?').pop().split('&');
        
        // Analytics event
        pushEventTag('load_url_params', '', params, 'user');
        
        params.forEach(function(param) {
            let paramType = param.split('=').shift(),
                paramVals = param.split('=').pop().split(',');
            
            if (paramType != 'search') {
                let filtersContainer = document.querySelector('div.filters[filter-type="'+ paramType +'"]'),
                    filterButtons = filtersContainer.querySelectorAll('button.filter-button');
                
                paramVals.forEach(function(val) {
                    let filterVal = val.replace('_', ' '),
                        filterButton = filtersContainer.querySelector('button.filter-button[filter="'+ filterVal +'"]');
                    filterButton.click();
                });
            } else {
                let searchInput = document.querySelector('input.search'),
                    inputEvent = new Event('input', {
                            bubbles: true,
                            cancelable: true,
                        }),
                    blurEvent = new Event('blur', {
                            bubbles: true,
                            cancelable: true
                        });
                
                searchInput.value = paramVals;
                searchInput.dispatchEvent(inputEvent);
                searchInput.dispatchEvent(blurEvent);
            }
        });
    }
}

function setEmptyState() {
    let body = document.querySelector('body'),
        sections = document.querySelectorAll('section.price-zone, section.favorites'),
        articles = document.querySelectorAll('article.product-model');
    
    sections.forEach(function(section) {
        let sectionZone = section.getAttribute('zone'),
            visibleArticles = section.querySelectorAll('article.product-model[state="visible"]:not([search="miss"])').length;
        
        if (visibleArticles) {
            section.removeAttribute('empty');
        } else {
            section.setAttribute('empty', 'true');
        }
        
        //console.log('('+ sectionZone +') - Visible articles: ' + visibleArticles);
    });
    
    let contentfulSections = document.querySelectorAll('section.price-zone:not([empty="true"])').length;
    
    if (contentfulSections) {
        body.removeAttribute('empty');
    } else {
        body.setAttribute('empty', 'true');
    }
}

// Promo
function addPromo(phoneName, htmlProductBottom) {
    let targetPhone = 'ThieAudio Legacy 2';
    
    if (phoneName === targetPhone) {
        let promoLink = 'https://forms.gle/Yg1xZonFCqetsKAm8',
            promoCopy = 'Enter to win',
            promoPrice = 'FREE',
            htmlPromo = document.createElement('div'),
            htmlPromoLink = document.createElement('a'),
            htmlPromoLabel = document.createElement('span'),
            htmlPromoPrice = document.createElement('span');
        
        htmlPromo.className = 'row';
        htmlPromo.classList.add('promo');
        htmlPromoLink.className = 'link-store';
        htmlPromoLabel.className = 'store-name';
        htmlPromoPrice.className = 'store-price';
        
        htmlPromoLink.setAttribute('href', promoLink);
        htmlPromoLink.setAttribute('target', '_blank');
        htmlPromoLabel.textContent = promoCopy;
        htmlPromoPrice.textContent = promoPrice;
        
        htmlPromo.append(htmlPromoLink);
        htmlPromoLink.append(htmlPromoLabel);
        htmlPromoLink.append(htmlPromoPrice);
        
        htmlProductBottom.append(htmlPromo);
    }
}

// Super logo spin
function superSpin() {
    let splashContainer = document.querySelector('section.splash'),
        superLogo = document.querySelector('div.super-logo');
    
    superLogo.addEventListener('mousedown', function() {
        let spinStatus = superLogo.getAttribute('data-spinning');
        
        if ( spinStatus === 'true' ) {
            
        } else {
            superLogo.setAttribute('data-spinning', 'true');
            setTimeout(function() {
                superLogo.setAttribute('data-spinning', 'false');
            }, 3000);
        }
    })
}
superSpin();
