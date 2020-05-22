// @flow strict
import CMS from 'netlify-cms-app';
import { ru } from 'netlify-cms-locales';
import PagePreview from './preview-templates/page-preview';
import PostPreview from './preview-templates/post-preview';

CMS.registerLocale('ru', ru);
CMS.registerPreviewTemplate('pages', PagePreview);
CMS.registerPreviewTemplate('posts', PostPreview);
