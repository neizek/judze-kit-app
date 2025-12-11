// import UIKit
// import Capacitor

// class MyViewController: CAPBridgeViewController {
//     override func viewDidLoad() {
//         super.viewDidLoad()
//         webView!.allowsBackForwardNavigationGestures = true
// 		webView!.scrollView.bounces = true
// 		webView!.scrollView.showsVerticalScrollIndicator = false
//     }
// }

class MyViewController: CAPBridgeViewController {
    override func viewDidLoad() {
        super.viewDidLoad()

        webView?.allowsBackForwardNavigationGestures = true

        if let scrollView = webView?.scrollView {
            scrollView.bounces = true
            scrollView.alwaysBounceVertical = true
            scrollView.alwaysBounceHorizontal = false
            scrollView.showsVerticalScrollIndicator = false
            scrollView.showsHorizontalScrollIndicator = false
        }
    }
}
