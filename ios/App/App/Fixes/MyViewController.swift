import UIKit
import Capacitor

class MyViewController: CAPBridgeViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        webView!.allowsBackForwardNavigationGestures = true
		webView!.scrollView.bounces = true
		webView!.scrollView.showsVerticalScrollIndicator = false
    }
}