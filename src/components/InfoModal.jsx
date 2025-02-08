'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { XMarkIcon } from '@heroicons/react/20/solid'

function InfoModal({ isOpen, closeModal }) {
    const markdownExample = `
# Markdown Formatting Guide

This guide provides examples of common Markdown syntax for formatting your text.

## Basic Formatting

-   **Bold Text**: Wrap text in double asterisks \`**bold text**\`.
    *Example:* \`**This is bold text**\`
    *Output:* **This is bold text**

-   *Italic Text*: Wrap text in single asterisks \`*italic text*\`.
    *Example:* \`*This is italic text*\`
    *Output:* *This is italic text*

-   ~~Strikethrough Text~~: Wrap text in double tildes \`~~strikethrough text~~\`.
    *Example:* \`~~This is strikethrough text~~\`
    *Output:* ~~This is strikethrough text~~

-   __Underline Text__: Wrap text in double underscores \`__underline text__\`.
    *Example:* \`__This is underline text__\`
    *Output:* __This is underline text__

## Lists

### Unordered Lists

Use hyphens, asterisks, or plus signs to create unordered lists.

\`\`\`markdown
- Item 1
- Item 2
- Item 3
\`\`\`

*Output:*

-   Item 1
-   Item 2
-   Item 3

### Ordered Lists

Use numbers followed by periods to create ordered lists.

\`\`\`markdown
1. First item
2. Second item
3. Third item
\`\`\`

*Output:*

1.  First item
2.  Second item
3.  Third item

## Links

Create links using the following syntax: \`[Link text](URL)\`.

*Example:* \`[Google](https://www.google.com)\`
*Output:* [Google](https://www.google.com)

## Images

Display images using the following syntax: \`![Alt text](image URL)\`.

*Example:* \`![Example Image](https://via.placeholder.com/150)\`
*Output:*

![Example Image](https://via.placeholder.com/150)

## Code

### Inline Code

Wrap inline code in single backticks \`code\`.

*Example:* \`Use the \`console.log()\` function.\`
*Output:* Use the \`console.log()\` function.

### Code Blocks

Use triple backticks to create code blocks. Specify the language for syntax highlighting.

\`\`\`javascript
function helloWorld() {
    console.log("Hello, world!");
}
\`\`\`

*Output:*

\`\`\`javascript
function helloWorld() {
    console.log("Hello, world!");
}
\`\`\`

## Blockquotes

Use the \`>\` symbol to create blockquotes.

\`\`\`markdown
> This is a blockquote.
> It can span multiple lines.
\`\`\`

*Output:*

> This is a blockquote.
> It can span multiple lines.

## Horizontal Rule

Use three or more hyphens, asterisks, or underscores to create a horizontal rule.

\`\`\`markdown
---
\`\`\`

*Output:*

---

## Tables

\`\`\`markdown
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
\`\`\`

*Output:*

| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

## Headings

\`\`\`markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
\`\`\`

*Output:*

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
`

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-base-300 text-base-content border-2 border-white text-left align-middle shadow-xl transition-all">
                                    {/* Header */}
                                    <div className="sticky top-0 bg-base-300 py-3 px-6 flex items-center justify-between border-b border-white">
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                                            Markdown Formatting Guide
                                        </Dialog.Title>
                                        <button
                                            onClick={closeModal}
                                            className="rounded-md p-2 hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-white"
                                        >
                                            <span className="sr-only">Close panel</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 overflow-y-auto max-h-[70vh]">
                                        <ReactMarkdown
                                            className="prose prose-stone w-full max-w-none"
                                            children={markdownExample}
                                            remarkPlugins={[remarkGfm]}
                                        />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default InfoModal