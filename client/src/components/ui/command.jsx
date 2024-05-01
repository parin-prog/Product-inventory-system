import React from "react";
import PropTypes from "prop-types";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Command as CommandPrimitive } from "cmdk";

const Command = React.forwardRef(function Command ({ className, ...props }, ref) {
    return (
        <CommandPrimitive
            ref={ref}
            className={`flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground ${className}`}
            {...props}
        />
    );
});

Command.displayName = CommandPrimitive.displayName;

const CommandInput = React.forwardRef(function CommandInput ({ className, ...props }, ref) {
    return (
        <div className="flex items-center border-b px-3">
            <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandPrimitive.Input
                ref={ref}
                className={`flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
                {...props}
            />
        </div>
    );
});

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef(function CommandList ({ className, ...props }, ref) {
    return (
        <CommandPrimitive.List
            ref={ref}
            className={`max-h-[300px] overflow-y-auto overflow-x-hidden ${className}`}
            {...props}
        />
    );
});

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef(function CommandEmpty (props, ref) {
    return (
        <CommandPrimitive.Empty
            ref={ref}
            className="py-6 text-center text-sm"
            {...props}
        />
    );
});

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef(function CommandGroup ({ className, ...props }, ref) {
    return (
        <CommandPrimitive.Group
            ref={ref}
            className={`overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground ${className}`}
            {...props}
        />
    );
});

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef(function CommandSeparator ({ className, ...props }, ref) {
    return (
        <CommandPrimitive.Separator
            ref={ref}
            className={`-mx-1 h-px bg-border ${className}`}
            {...props}
        />
    );
});

CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef(function CommandItem ({ className, ...props }, ref) {
    return (
        <CommandPrimitive.Item
            ref={ref}
            className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent/65 ${className}`}
            {...props}
        />
    );
});

CommandItem.displayName = CommandPrimitive.Item.displayName;

function CommandShortcut ({ className, ...props }) {
    return (
        <span
            className={`ml-auto text-xs tracking-widest text-muted-foreground ${className}`}
            {...props}
        />
    );
}

CommandShortcut.displayName = "CommandShortcut";

// Prop Types
Command.propTypes = {
    className: PropTypes.string,
};

CommandInput.propTypes = {
    className: PropTypes.string,
};

CommandList.propTypes = {
    className: PropTypes.string,
};

CommandEmpty.propTypes = {
    children: PropTypes.node.isRequired,
};

CommandGroup.propTypes = {
    className: PropTypes.string,
};

CommandSeparator.propTypes = {
    className: PropTypes.string,
};

CommandItem.propTypes = {
    className: PropTypes.string,
};

CommandShortcut.propTypes = {
    className: PropTypes.string,
};

export {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
    CommandSeparator,
};
