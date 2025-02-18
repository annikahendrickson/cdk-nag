/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/

import { CfnLoadBalancer } from '@aws-cdk/aws-elasticloadbalancingv2';
import { IConstruct, Stack } from '@aws-cdk/core';

/**
 * Application Load Balancers are enabled to drop invalid headers - (Control IDs: AC-17(2), SC-7, SC-8, SC-8(1), SC-23)
 * @param node the CfnResource to check
 */
export default function (node: IConstruct): boolean {
  if (node instanceof CfnLoadBalancer) {
    const attributes = Stack.of(node).resolve(node.loadBalancerAttributes);
    const reg =
      /"routing\.http\.drop_invalid_header_fields\.enabled","value":"true"/gm;
    if (JSON.stringify(attributes).search(reg) == -1) {
      return false;
    }
  }
  return true;
}
