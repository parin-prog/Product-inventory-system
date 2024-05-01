import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import PropTypes from "prop-types";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
                destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
                outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
                secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

function Button ({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? Slot : "button";
    return (
        <Comp
            className={`${buttonVariants({ variant, size, className })}`}
            {...props}
        />
    );
}

Button.displayName = "Button";

Button.propTypes = {
    className: PropTypes.string,
    variant: PropTypes.oneOf([
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
    ]),
    size: PropTypes.oneOf(["default", "sm", "lg", "icon"]),
    asChild: PropTypes.bool,
};

export { Button, buttonVariants };
