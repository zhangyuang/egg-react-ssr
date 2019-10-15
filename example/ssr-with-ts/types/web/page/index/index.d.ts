import './index.less';
interface Props {
    news: News[];
}
interface News {
    id: string;
    title: string;
}
declare const Page: SFC<Props>;
export default Page;
