#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@implementation UIScrollView (EnableBounce)
- (void)didMoveToWindow {
   [super didMoveToWindow];
   self.bounces = YES;
}
@end
