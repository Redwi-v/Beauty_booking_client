import { HomeView } from "@/views/home";

const STUDIO_TEST_DATA = {
  
  name: 'студия маникюра',
  address: 'ул. Яна-полуяна д. 43',
  logo: 'https://f1.dikidi.net/c2/v1088/4egq9ai4gi.jpg',
  id: 1,

}

export default function Home() {

  return (

    <>

      <HomeView studioInfo = { STUDIO_TEST_DATA } />

    </>

  );

}
