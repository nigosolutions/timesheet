export function authenticate(gssp = async () => {}) {
  return async (context) => {
    let userProps = {};
    let name = context.req.session.user_name
      ? context.req.session.user_name
      : "";
    let role = context.req.session.user_role
      ? context.req.session.user_role
      : "";
    if (name && role) {
      userProps = { name: name, role: role };
    } else {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const propsFromGSSP = await gssp();
    const props =
      propsFromGSSP && propsFromGSSP.props
        ? { props: { ...propsFromGSSP.props, ...userProps } }
        : { props: { ...userProps } };
    console.log(props);
    return props;
  };
}
