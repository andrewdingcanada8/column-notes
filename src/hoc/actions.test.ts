import { beforeEach, describe, expect, it, vi } from 'vitest'
import { shift_child_order } from "../hoc/actions";

describe('shift_child_order_3_element', () => {
  let context: any;
  beforeEach(() => {
    context = {
      state: {
        blocks: {
          parent_id: {
            children: ['child1', 'child2', 'child3'],
          },
        },
      },
      dispatch: vi.fn(),
    };
  });

  it('shifts child order to start', () => {
    const result = shift_child_order(context, 'parent_id', 'child2', 'start', 1);
    expect(result).toBe(true);
    expect(context.dispatch).toHaveBeenCalledWith({
      type: 'modify',
      id: 'parent_id',
      block_data: { children: ['child2', 'child1', 'child3'] },
    });
  });

  it('shifts child order to end', () => {
    const result = shift_child_order(context, 'parent_id', 'child2', 'end', 1);
    expect(result).toBe(true);
    expect(context.dispatch).toHaveBeenCalledWith({
      type: 'modify',
      id: 'parent_id',
      block_data: { children: ['child1', 'child3', 'child2'] },
    });
  });

  it('fails to shift child order to start', () => {
    const result = shift_child_order(context, 'parent_id', 'child2', 'start', 2);
    expect(result).toBe(false);
    expect(context.dispatch).not.toHaveBeenCalled();
  });

  it('fails to shift child order to end', () => {
    const result = shift_child_order(context, 'parent_id', 'child2', 'end', 2);
    expect(result).toBe(false);
    expect(context.dispatch).not.toHaveBeenCalled();
  });
});

describe('shift_child_order_5_element', () => {
  let context: any;
  beforeEach(() => {
    context = {
      state: {
        blocks: {
          parent_id: {
            children: ['child1', 'child2', 'child3', 'child4', 'child5'],
          },
        },
      },
      dispatch: vi.fn(),
    };
  });

  it('shifts child order to start', () => {
    const result = shift_child_order(context, 'parent_id', 'child5', 'start', 3);
    expect(result).toBe(true);
    expect(context.dispatch).toHaveBeenCalledWith({
      type: 'modify',
      id: 'parent_id',
      block_data: { children: ['child1', 'child5', 'child2', 'child3', 'child4'] },
    });
  });

  it('shifts child order to end', () => {
    const result = shift_child_order(context, 'parent_id', 'child2', 'end', 3);
    expect(result).toBe(true);
    expect(context.dispatch).toHaveBeenCalledWith({
      type: 'modify',
      id: 'parent_id',
      block_data: { children: ['child1', 'child3', 'child4', 'child5', 'child2'] },
    });
  });

  it('fails to shift child order to start', () => {
    const result = shift_child_order(context, 'parent_id', 'child2', 'start', 10);
    expect(result).toBe(false);
    expect(context.dispatch).not.toHaveBeenCalled();
  });

  it('fails to shift child order to end', () => {
    const result = shift_child_order(context, 'parent_id', 'child2', 'end', 10);
    expect(result).toBe(false);
    expect(context.dispatch).not.toHaveBeenCalled();
  });
});
