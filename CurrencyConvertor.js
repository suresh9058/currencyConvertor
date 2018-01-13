function convertor(i) {
    var xhttp = new XMLHttpRequest();
    var baseCurrency = document.getElementsByName("base_currency")[i];
    var baseCurrencyText = baseCurrency.options[baseCurrency.selectedIndex].text;
    var targetCurrency = document.getElementsByName("target_currency")[i];
    var targetCurrencyText = targetCurrency.options[targetCurrency.selectedIndex].text;
    
    var url = "https://api.fixer.io/latest";
    var params = "base="+baseCurrencyText+"&symbols="+targetCurrencyText;
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        if(baseCurrencyText != targetCurrencyText) {
            var obj = JSON.parse(this.responseText);
            document.getElementsByName('convertor')[i].value = obj.rates[targetCurrencyText] * document.getElementsByName('convert')[i].value;
        } else {
            document.getElementsByName('convertor')[i].value = document.getElementsByName('convert')[i].value;
        }
        if(Math.sign(document.getElementsByName('convert')[i].value) == -1) {
            document.getElementsByName('convertor')[i].value = "";
        }
    } 
    else if(this.readyState == 4 && this.status != 200) {
        alert("OOPS! Something Went Wrong");
    }
    }
    xhttp.open("GET", url+"?"+params, true);
    xhttp.send();
}