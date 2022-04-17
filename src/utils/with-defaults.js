const withDefaults = (component, defaultProps) => {
    component.defaultProps = defaultProps;
    return component;
};

export default withDefaults;
