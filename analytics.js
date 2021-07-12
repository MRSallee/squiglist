// Set these variables to your own GTM ID and site name
let analyticsSite = "Squiglist",                    // Site name for attributing analytics events to your site
    analyticsGtmId = "GTM-WNMXPHJ",                 // GTM ID used for analytics. If you don't already have one, you'' need to create a Google Tag Manager account
    logAnalytics = true;                            // If true, events are logged in console

// Load Google Tag Manager onto the page
function setupGraphAnalytics() {
    const gtmScriptContent = "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','"+ analyticsGtmId +"');",
        gtmIframeSrc = "https://www.googletagmanager.com/ns.html?id="+ analyticsGtmId,
        gtmIframeStyle = "display: none; visibility: hidden;",
        graphAnalyticsSrc = "graphAnalytics.js";

    const pageHead = document.querySelector("head"),
          pageBody = document.querySelector("body"),
          gtmScript = document.createElement("script"),
          gtmNoscript = document.createElement("noscript"),
          gtmIframe = document.createElement("iframe"),
          graphAnalytics = document.createElement("script");

    gtmScript.textContent = gtmScriptContent;
    pageHead.prepend(gtmScript);
}
setupGraphAnalytics();

window.dataLayer = window.dataLayer || [];



// *************************************************************
// Functions to fire events
// *************************************************************

// For events not related to a specific phone, e.g. user clicked screenshot button
function pushEventTag(eventName, phone, other, trigger) {
    let eventTrigger = trigger ? trigger : "user",
        phoneModel = phone,
        otherData = other ? other : "null",
        value = 1;
    
    window.dataLayer.push({
        "event" : eventName,
        "trigger" : eventTrigger,
        "site": analyticsSite,
        "phone_name": phoneModel,
        "other": otherData,
        "value": value
    });
    
    if (logAnalytics) { console.log("Event:      "+ eventName +"\nTrigger:    "+ eventTrigger +"\nSite name:  "+ analyticsSite +"\nModel:      "+ phoneModel +"\nOther:      "+ otherData); }
}

if (logAnalytics) { console.log("... Analytics initialized ... "); }