import React from 'react'

class AdsAnalysisTooltip extends React.PureComponent {
  formatPrice(price) {
    return `$${(+price).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")}`;
  }

  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;
      if (!payload) {
        return null;
      }

      const WEEKDAY_STRING = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const date = new Date(label);
      const weekday = WEEKDAY_STRING[date.getDay()]

      return (
        <div style={{ border: '1px solid #ccc', padding: '15px', background: '#fff' }}>
          <p className="label">{`${label} (${weekday})`}</p>
          <div style={{ marginTop: '10px' }}>
            {
              payload.map((ele, index) => {
                let displayName = '';
                let value = ele.value;
                switch (ele.name) {
                  case 'facebookFittedValues':
                    displayName = 'FacebookFit';
                    value = `${this.formatPrice(value)}`;
                    break;
                  case 'facebookPredictUpp':
                    displayName = 'FacebookUpper';
                    value = `${this.formatPrice(value)}`;
                    break;
                  case 'facebookPredictLow':
                    displayName = 'FacebookLower';
                    value = `${this.formatPrice(value)}`;
                    break;
                  case 'flurryFittedValues':
                    displayName = 'FlurryFit';
                    value = `${this.formatPrice(value)}`;
                    break;
                  case 'flurryPredictUpp':
                    displayName = 'FlurryUpper';
                    value = `${this.formatPrice(value)}`;
                    break;
                  case 'flurryPredictLow':
                    displayName = 'FlurryLower';
                    value = `${this.formatPrice(value)}`;
                    break;
                  case 'admobFittedValues':
                    displayName = 'AdMobFit';
                    value = `${this.formatPrice(value)}`;
                    break;
                  case 'admobPredictUpp':
                    displayName = 'AdMobUpper';
                    value = `${this.formatPrice(value)}`;
                    break;
                  case 'admobPredictLow':
                    displayName = 'AdMobLower';
                    value = `${this.formatPrice(value)}`;
                    break;
                  case 'marketPlaceFittedValues':
                    displayName = 'MarketPlaceFit';
                    value = `${this.formatPrice(value)}`;
                    break;
                  case 'marketPlacePredictUpp':
                    displayName = 'MarketPlaceUpper';
                    value = `${this.formatPrice(value)}`;
                    break;
                  case 'marketPlacePredictLow':
                    displayName = 'MarketPlaceLower';
                    value = `${this.formatPrice(value)}`;
                    break;
                  case 'facebook':
                    displayName = 'Facebook';
                    value = `${this.formatPrice(value)}`;
                    break;
                  case 'flurry':
                    displayName = 'Flurry';
                    value = `${this.formatPrice(value)}`;
                    break;
                  case 'admob':
                    displayName = 'AdMob';
                    value = `${this.formatPrice(value)}`;
                    break;
                  case 'marketPlace':
                    displayName = 'Market Place';
                    value = `${this.formatPrice(value)}`;
                    break;
                  case 'revenue':
                    displayName = 'Revenue';
                    value = `${this.formatPrice(value)}`;
                    break;
                  case 'impression':
                    displayName = 'Impression';
                    break;
                  case 'admobRevenue':
                    displayName = 'AdMob';
                    value = `${this.formatPrice(value)} (${(value * 100 / ele.payload.revenue).toFixed(2)}%)`;
                    break;
                  case 'adsenseRevenue':
                    displayName = 'Adsense';
                    value = `${this.formatPrice(value)} (${(value * 100 / ele.payload.revenue).toFixed(2)}%)`;
                    break;
                  case 'facebookRevenue':
                    displayName = 'Facebook';
                    value = `${this.formatPrice(value)} (${(value * 100 / ele.payload.revenue).toFixed(2)}%)`;
                    break;
                  case 'flurryRevenue':
                    displayName = 'Flurry';
                    value = `${this.formatPrice(value)} (${(value * 100 / ele.payload.revenue).toFixed(2)}%)`;
                    break;
                  case 'marketRevenue':
                    displayName = 'MarketPlace';
                    value = `${this.formatPrice(value)} (${(value * 100 / ele.payload.revenue).toFixed(2)}%)`;
                    break;
                  case 'mobfoxRevenue':
                    displayName = 'MobFox';
                    value = `${this.formatPrice(value)} (${(value * 100 / ele.payload.revenue).toFixed(2)}%)`;
                    break;
                  case 'adviewRevenue':
                    displayName = 'Adview';
                    value = `${this.formatPrice(value)} (${(value * 100 / ele.payload.revenue).toFixed(2)}%)`;
                    break;
                  case 'emptyRevenue':
                    // In stacked bar chart, we want to show total revenue on the tooltip but don't want the chart itself
                    // Hence, we pass a empty or undefined to Recharts
                    displayName = 'Revenue';
                    value = this.formatPrice(ele.payload.revenue);
                    break;
                  case 'emptyImpression':
                    displayName = 'Impression';
                    value = ele.payload.impression;
                    break;
                  case 'admobImpression':
                    displayName = 'AdMob';
                    value = `${value} (${(value * 100 / ele.payload.impression).toFixed(2)}%)`;
                    break;
                  case 'facebookImpression':
                    displayName = 'Facebook';
                    value = `${value} (${(value * 100 / ele.payload.impression).toFixed(2)}%)`;
                    break;
                  case 'flurryImpression':
                    displayName = 'Flurry';
                    value = `${value} (${(value * 100 / ele.payload.impression).toFixed(2)}%)`;
                    break;
                  case 'marketImpression':
                    displayName = 'MarketPlace';
                    value = `${value} (${(value * 100 / ele.payload.impression).toFixed(2)}%)`;
                    break;
                  case 'mobfoxImpression':
                    displayName = 'MobFox';
                    value = `${value} (${(value * 100 / ele.payload.impression).toFixed(2)}%)`;
                    break;
                  case 'adsenseImpression':
                    displayName = 'Adsense';
                    value = `${value} (${(value * 100 / ele.payload.impression).toFixed(2)}%)`;
                    break;
                  case 'adviewImpression':
                    displayName = 'Adview';
                    value = `${value} (${(value * 100 / ele.payload.impression).toFixed(2)}%)`;
                    break;  
                  case 'admobECPM':
                    displayName = 'AdMob';
                    value = this.formatPrice(value);
                    break;
                  case 'facebookECPM':
                    displayName = 'Facebook';
                    value = this.formatPrice(value);
                    break;
                  case 'flurryECPM':
                    displayName = 'Flurry';
                    value = this.formatPrice(value);
                    break;
                  case 'marketECPM':
                    displayName = 'MarketPlace';
                    value = this.formatPrice(value);
                    break;
                  case 'mobfoxECPM':
                    displayName = 'MobFox';
                    value = this.formatPrice(value);
                    break;
                  case 'adsenseECPM':
                    displayName = 'Adsense';
                    value = this.formatPrice(value);
                    break;
                  case 'adviewECPM':
                    displayName = 'Adview';
                    value = this.formatPrice(value);
                    break;
                  case 'android_valid':
                    displayName = 'Android Valid';
                    value = `${value} (${(value * 100 / (value + ele.payload.android_invalid)).toFixed(2)}%)`;
                    break;
                  case 'android_invalid':
                    displayName = 'Android Invalid';
                    value = `${value} (${(value * 100 / (value + ele.payload.android_valid)).toFixed(2)}%)`;
                    break;
                  case 'ios_valid':
                    displayName = 'iOS Valid';
                    value = `${value} (${(value * 100 / (value + ele.payload.ios_invalid)).toFixed(2)}%)`;
                    break;
                  case 'ios_invalid':
                    displayName = 'iOS Invalid';
                    value = `${value} (${(value * 100 / (value + ele.payload.ios_valid)).toFixed(2)}%)`;
                    break;
                  case 'total_valid':
                    displayName = 'Total Valid';
                    value = `${value} (${(value * 100 / (value + ele.payload.total_invalid)).toFixed(2)}%)`;
                    break;
                  case 'total_invalid':
                    displayName = 'Total Invalid';
                    value = `${value} (${(value * 100 / (value + ele.payload.total_valid)).toFixed(2)}%)`;
                    break;
                  case 'emptyIOSRegister':
                    displayName = 'Register';
                    value = ele.payload.ios_invalid + ele.payload.ios_valid;
                    break;
                  case 'emptyAndroidRegister':
                    displayName = 'Register';
                    value = ele.payload.android_invalid + ele.payload.android_valid;
                    break;
                  case 'emptyTotalRegister':
                    displayName = 'Register User';
                    value = ele.payload.total_valid + ele.payload.total_invalid;
                    break;
                  case 'registerValidIOSRatio':
                    displayName = 'Valid ratio';
                    value = `${value}%`
                    break;
                  case 'registerValidAndroidRatio':
                    displayName = 'Valid ratio';
                    value = `${value}%`
                    break;
                  case 'registerValidRatio':
                    displayName = 'Valid ratio';
                    value = `${value}%`
                    break;
                  case 'androidInstall':
                    displayName = 'Android Install User';
                    value = `${value === 0 ? value : value + ele.payload.android_valid + ele.payload.android_invalid}`
                    break;
                  case 'iOSInstall':
                    displayName = 'iOS Install User';
                    value = `${value === 0 ? value : value + ele.payload.ios_valid + ele.payload.ios_invalid}`
                    break;
                  case 'totalInstall':
                    displayName = 'Total Install User';
                    value = `${value === 0 ? value : value + ele.payload.total_valid + ele.payload.total_invalid}`
                    break;
                  case 'registerAndroidRatio':
                  case 'registerIOSRatio':
                  case 'registerTotalRatio':
                    displayName = 'Register Ratio';
                    value = `${value.toFixed(2)}%`
                    break;
                  case 'delay1':
                    displayName = 'delay 1 day';
                    value = `${value.toFixed(2)}%`
                    break;
                  case 'delay2':
                    displayName = 'delay 2 days';
                    value = `${value.toFixed(2)}%`
                    break;
                  case 'delay3':
                    displayName = 'delay 3 days';
                    value = `${value.toFixed(2)}%`
                    break;
                  case 'releaseHistory':
                    return null
                  case 'emptyAndroidHistory':
                    if (!ele.payload.releaseAndroid) {
                      return null
                    }
                    displayName = 'Android release';
                    value = `${ele.payload.releaseAndroid.version}`
                    break;
                  case 'emptyIOSHistory':
                    if (!ele.payload.releaseIOS) {
                      return null
                    }
                    displayName = 'iOS release';
                    value = `${ele.payload.releaseIOS.version}`
                    break;
                  default:
                    displayName = ele.name;
                    break;
                }

                if (ele.stroke === 'rgba(255,255,255,0)') {
                  return null;
                }

                return (<p key={ele.name} style={{ color: ele.stroke || ele.fill, display: 'block', height: '20px' }}>{`${displayName} : ${value}`}</p>)
              })
            }
          </div>
        </div>
      )
    }

    return null;
  }
}

export default AdsAnalysisTooltip