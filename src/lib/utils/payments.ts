// // import "cordova-plugin-purchase/www/store.d";
// import "cordova-plugin-purchase";

// class SubscriptionService {

// 	constructor(store: CdvPurchase.Store) {
// 	  // Setup receipt validation (recommended)
// 	  store.validator = "https://validator.iaptic.com/v1/validate?appName=demo&apiKey=12345678";
  
// 	  // Register products
// 	  store.register([{
// 		id: 'subscription1',
// 		platform: CdvPurchase.Platform.APPLE_APPSTORE,
// 		type: CdvPurchase.ProductType.PAID_SUBSCRIPTION,
// 	  }]);
  
// 	  // Setup event handlers
// 	  store.when()
// 		.productUpdated(() => {
// 		  console.log('Products loaded from the store:', store.products);
// 		  updateProductsUI(); //
// 		})
// 		.approved(transaction => {
// 		  console.log('Purchase approved:', transaction);
// 		  transaction.verify();
// 		})
// 		.verified(receipt => {
// 		  console.log('Purchase verified:', receipt);
// 		  receipt.finish();
// 		  updateActiveSubscriptionUI();
// 		});
  
// 	  // Initialize the store
// 	  store.initialize([{
// 		platform: CdvPurchase.Platform.APPLE_APPSTORE,
// 		options: {
// 		  needAppReceipt: true,
// 		}
// 	  }]);
// 	}
  
// 	/** Purchase a subscription */
// 	subscribe(productId: string) {
// 	  const product = store.get(productId);
// 	  if (!product) {
// 		console.log('Product not found');
// 		return;
// 	  }
// 	  product.getOffer()?.order()
// 		.then(error => {
// 		  if (error) {
// 			if (error.code === CdvPurchase.ErrorCode.PAYMENT_CANCELLED) {
// 			  console.log('Payment cancelled by user');
// 			}
// 			else {
// 			  console.log('Failed to subscribe:', error);
// 			}
// 		  }
// 		});
// 	}
  
// 	/** Check if user has an active subscription */
// 	hasActiveSubscription(): boolean {
// 	  return store.owned('subscription1');
// 	}
//   }