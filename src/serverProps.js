export default async function getServerSideProps(context) {
    const NAVCONTROL = context.res.getHeader('X-NAVCONTROL');
    context.res.removeHeader('X-NAVCONTROL');
    return { props: { NAVCONTROL } };
}