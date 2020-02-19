import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { AboutComponent } from './pages/about/about.component';
import { ForumComponent } from './pages/forum/forum.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { PipeShopPipe } from './shared/pipes/pipe-shop.pipe';
import { AdminComponent } from './admin/admin.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminColorsComponent } from './admin/admin-colors/admin-colors.component';
import { AdminSizesComponent } from './admin/admin-sizes/admin-sizes.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductComponent } from './pages/product/product.component';
import { AdminForumComponent } from './admin/admin-forum/admin-forum.component';
import { ForumBlog1Component } from './pages/forum/forum-blog1/forum-blog1.component';
import { ForumBlog2Component } from './pages/forum/forum-blog2/forum-blog2.component';
import { ForumBlog3Component } from './pages/forum/forum-blog3/forum-blog3.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdminSubscribeComponent } from './admin/admin-subscribe/admin-subscribe.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ExperienceShippingComponent } from './pages/experience-shipping/experience-shipping.component';
import { ExperiencePolicyComponent } from './pages/experience-policy/experience-policy.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { UserComponent } from './pages/user/user.component';
import { ColorsPipe } from './shared/pipes/colors.pipe';
import { Ng5SliderModule } from 'ng5-slider';
import { PricePipe } from './shared/pipes/price.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ShopComponent,
    AboutComponent,
    ForumComponent,
    ContactComponent,
    FooterComponent,
    PipeShopPipe,
    AdminComponent,
    AdminProductsComponent,
    AdminCategoryComponent,
    AdminColorsComponent,
    AdminSizesComponent,
    AdminOrdersComponent,
    ProductComponent,
    AdminForumComponent,
    ForumBlog1Component,
    ForumBlog2Component,
    ForumBlog3Component,
    AdminBlogComponent,
    CartComponent,
    AdminSubscribeComponent,
    CheckoutComponent,
    ExperienceShippingComponent,
    ExperiencePolicyComponent,
    AdminUsersComponent,
    UserComponent,
    ColorsPipe,
    PricePipe,



   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'sport-shop'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    Ng5SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
