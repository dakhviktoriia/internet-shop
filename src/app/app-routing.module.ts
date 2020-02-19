import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { AboutComponent } from './pages/about/about.component';
import { ForumComponent } from './pages/forum/forum.component';
import { ContactComponent } from './pages/contact/contact.component';
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
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';


import { ExperienceShippingComponent } from './pages/experience-shipping/experience-shipping.component';
import { ExperiencePolicyComponent } from './pages/experience-policy/experience-policy.component';
import { UserComponent } from './pages/user/user.component';




const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'product', component: ProductComponent },
  { path: 'about', component: AboutComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'user', component: UserComponent },
  {
    path: 'forum', component: ForumComponent, children: [
      { path: '', redirectTo: 'blog1', pathMatch: 'full' },
      { path: 'blog1', component: ForumBlog1Component },
      { path: 'blog2', component: ForumBlog2Component },
      { path: 'blog3', component: ForumBlog3Component },
    ]
  },
  { path: 'contact', component: ContactComponent },

  {
    path: 'admin', component: AdminComponent, children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },

      { path: 'products', component: AdminProductsComponent },
      { path: 'category', component: AdminCategoryComponent },
      { path: 'colors', component: AdminColorsComponent },
      { path: 'sizes', component: AdminSizesComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: 'forum', component: AdminForumComponent },
      { path: 'blog', component: AdminBlogComponent },
      { path: 'subscribe', component: AdminSubscribeComponent },
      { path: 'users', component: AdminUsersComponent },
    ]
  },

    { path: 'shipping', component: ExperienceShippingComponent},
    { path: 'policy', component: ExperiencePolicyComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
