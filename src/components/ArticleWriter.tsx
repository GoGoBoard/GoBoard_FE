import { RefObject } from 'react';

import TextAlign from '@tiptap/extension-text-align';
import TextUnderline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import {
  LinkBubbleMenu,
  LinkBubbleMenuHandler,
  MenuButtonBold,
  MenuButtonEditLink,
  MenuButtonItalic,
  MenuButtonStrikethrough,
  MenuButtonUnderline,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  MenuSelectTextAlign,
  RichTextEditor,
  type RichTextEditorRef,
} from 'mui-tiptap';


type ArticleWriterProps = {
  rteRef: RefObject<RichTextEditorRef>;
};

function MenuControls() {
  return (
    <MenuControlsContainer>
      <MenuSelectHeading />
      <MenuDivider />
      <MenuButtonBold />
      <MenuButtonItalic />
      <MenuButtonUnderline />
      <MenuButtonStrikethrough />
      <MenuDivider />
      <MenuSelectTextAlign />
      <MenuDivider />
      <MenuButtonEditLink />
    </MenuControlsContainer>
  );
}

export default function ArticleWriter({ rteRef }: ArticleWriterProps) {
  return (
    <RichTextEditor
      ref={rteRef}
      extensions={[
        StarterKit,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        TextUnderline,
        LinkBubbleMenuHandler,
      ]}
      renderControls={() => <MenuControls />}
      children={() => <LinkBubbleMenu />}
    />
  );
}
