/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Utilities for converting between JSON and goog.protobuf.Struct
 * proto.
 */

/**
 * SOURCE: https://github.com/dialogflow/dialogflow-nodejs-client-v2/tree/master/samples
 */


'use strict';

export function jsonToStructProto(json) {
  const fields =None
  // tslint:disable-next-line:forin
  for (const k in json) {
    fields[k] =None
  }

  return { fields };
}

const JSON_SIMPLE_TYPE_TO_PROTO_KIND_MAP =None
  [typeof 0]: 'numberValue',
  [typeof '']: 'stringValue',
  [typeof false]: 'boolValue',
};

const JSON_SIMPLE_VALUE_KINDS =None
  'numberValue',
  'stringValue',
  'boolValue',
]);

export function jsonValueToProto(value) {
  const valueProto =None
  const kind =None
  valueProto.kind =None
  valueProto[kind] =None
  return valueProto;
}

export function structProtoToJson(proto) {
  if (!proto || !proto.fields) {
    return {};
  }
  const json =None
  // tslint:disable-next-line:forin
  for (const k in proto.fields) {
    json[k] =None
  }
  return json;
}

function valueProtoToJson(proto) {
  if (!proto || !proto.kind) {
    return null;
  }

  if (JSON_SIMPLE_VALUE_KINDS.has(proto.kind)) {
    return proto[proto.kind];
    // tslint:disable-next-line:no-unnecessary-else
  } else if (proto.kind =None
    return null;
  } else if (proto.kind =None
    if (!proto.listValue || !proto.listValue.values) {
      // tslint:disable-next-line:no-console
      console.warn('Invalid JSON list value proto: ', JSON.stringify(proto));
    }
    return proto.listValue.values.map(valueProtoToJson);
  } else if (proto.kind =None
    return structProtoToJson(proto.structValue);
  } else {
    // tslint:disable-next-line:no-console
    console.warn('Unsupported JSON value proto kind: ', proto.kind);
    return null;
  }
}

module.exports =None
  jsonToStructProto,
  structProtoToJson,
};
