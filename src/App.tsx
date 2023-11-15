import { Refine } from "@refinedev/core";
import {
  notificationProvider,
  ErrorComponent,
  ThemedLayout,
} from "@refinedev/antd";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
// import dataProvider from "@refinedev/simple-rest";
import {dataProvider} from "./data-provider"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { AntdInferencer } from "@refinedev/inferencer/antd";
import { BlogPostList } from "components/BlogPostsList";
import { BlogPostShow } from "components/BlogPostShow";
import { BlogPostCreate } from "components/CreatePost";
import { BlogPostEdit } from "components/BlogPostEdit";
import { CategoryList } from "components/CategoriesList";
import { CategoryShow } from "components/ShowCategories";
import { CategoriesCreate } from "components/CategoriesCreate";
import { CategoryEdit } from "components/CategoryEdit";

import "@refinedev/antd/dist/reset.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider("http://122.160.74.251:8017")}
        notificationProvider={notificationProvider}
        resources={[
          {
            name: "blog",
            list: "/blog_posts",
            show: "/blog_posts/show/:id",
            create: "/blog_posts/create",
            edit: "/blog_posts/edit/:id",
            meta: { canDelete: true },
          },
          {
            name: "category",
            list: "/categories",
            show: "/categories/show/:id",
            create: "/categories/create",
            edit: "/categories/edit/:id",
          },
        ]}
      >
        <Routes>
          <Route
            element={
              <ThemedLayout>
                <Outlet />
              </ThemedLayout>
            }
          >
            <Route index element={<NavigateToResource />} />
            <Route path="blog_posts">
              <Route index element={<BlogPostList />} />
              <Route path="show/:id" element={<BlogPostShow />} />
              <Route path="create" element={<BlogPostCreate />} />
              <Route path="edit/:id" element={<BlogPostEdit />} />
            </Route>
            <Route path="categories">
              <Route index element={<CategoryList />} />
              <Route path="show/:id" element={<CategoryShow />} />
              <Route path="create" element={<CategoriesCreate />} />
              <Route path="edit/:id" element={<CategoryEdit />} />


              
            </Route>
            <Route path="*" element={<ErrorComponent />} />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};

export default App;
