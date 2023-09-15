import { FC, useState } from 'react';
import { GetServerSideProps } from 'next';

import { DriveFileRenameOutline } from '@mui/icons-material';

import { AdminLayout } from '../../../components/layouts';
import { IProduct } from '../../../interfaces';
import { dbProducts } from '../../../database';
import { Product } from '@/models';
import { FormProduct } from '@/components/admin/FormProduct';
import { AlertSuccessMessage } from '@/components/ui';

type Props = {
  product: IProduct;
};

const ProductAdminPage: FC<Props> = ({ product }) => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <AdminLayout
      title={'Producto'}
      subTitle={`Editando: ${product.title}`}
      icon={<DriveFileRenameOutline />}
    >
      <AlertSuccessMessage
        message="Producto Actualizado Correctamente"
        setOpen={setShowAlert}
        showAlert={showAlert}
      />
      <FormProduct product={product} setShowAlert={setShowAlert} />
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = '' } = query;

  let product: IProduct | null;

  if (slug === 'new') {
    const tempProduct = JSON.parse(JSON.stringify(new Product()));
    delete tempProduct._id;
    // tempProduct.images = ['img1.jpg', 'img2.jpg'];
    product = tempProduct;
  } else {
    product = await dbProducts.getProductBySlug(slug.toString());
  }

  if (!product) {
    return {
      redirect: {
        destination: '/admin/products',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductAdminPage;
