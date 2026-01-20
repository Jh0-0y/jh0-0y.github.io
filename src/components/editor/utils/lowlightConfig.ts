import { createLowlight, common } from 'lowlight';

// lowlight 인스턴스 생성 및 공통 언어 등록
export const lowlight = createLowlight(common);

// 추가 언어 import 및 등록
import bash from 'highlight.js/lib/languages/bash';
import cpp from 'highlight.js/lib/languages/cpp';
import csharp from 'highlight.js/lib/languages/csharp';
import css from 'highlight.js/lib/languages/css';
import go from 'highlight.js/lib/languages/go';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import kotlin from 'highlight.js/lib/languages/kotlin';
import markdown from 'highlight.js/lib/languages/markdown';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import ruby from 'highlight.js/lib/languages/ruby';
import rust from 'highlight.js/lib/languages/rust';
import sql from 'highlight.js/lib/languages/sql';
import swift from 'highlight.js/lib/languages/swift';
import typescript from 'highlight.js/lib/languages/typescript';
import yaml from 'highlight.js/lib/languages/yaml';
import xml from 'highlight.js/lib/languages/xml';

// 언어 등록
lowlight.register('bash', bash);
lowlight.register('cpp', cpp);
lowlight.register('csharp', csharp);
lowlight.register('css', css);
lowlight.register('go', go);
lowlight.register('java', java);
lowlight.register('javascript', javascript);
lowlight.register('json', json);
lowlight.register('kotlin', kotlin);
lowlight.register('markdown', markdown);
lowlight.register('php', php);
lowlight.register('python', python);
lowlight.register('ruby', ruby);
lowlight.register('rust', rust);
lowlight.register('sql', sql);
lowlight.register('swift', swift);
lowlight.register('typescript', typescript);
lowlight.register('yaml', yaml);
lowlight.register('xml', xml);
lowlight.register('html', xml); // HTML은 XML 문법 사용