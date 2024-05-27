import { TemplateEngine } from './TemplateEngine';
import { ProhibitedError } from './ProhibitedError';


test('interpolation - simple', () => {
    const template = '<div class="${classes}" style="${itemStyles} ${containerStyles}">${content}</div>';

    const data = {
        classes: 'bg-primary',
        itemStyles: 'margin: 5px',
        containerStyles: 'display: flex',
        content: 'some content'
    };

    const result = new TemplateEngine().render(template, data);

    expect(result).toEqual('<div class="bg-primary" style="margin: 5px display: flex">some content</div>');
});

test('interpolation - complex', () => {
    const template = '<div>${1 + 1}</div>';

    const result = new TemplateEngine().render(template, {});

    expect(result).toEqual('<div>2</div>');
});

test('directive - if', () => {
    const template = '<#if true>one</#if>';

    const result = new TemplateEngine().render(template, {});

    expect(result).toEqual('one');
});

test('directive - if else', () => {
    const template = '<#if false>one<#else>two</#if>';

    const result = new TemplateEngine().render(template, {});

    expect(result).toEqual('two');
});

test('directive - elseif', () => {
    const template = '<#if false>one<#elseif true>two<#else>three</#if>';

    const result = new TemplateEngine().render(template, {});

    expect(result).toEqual('two');
});

test('directive - elseif else', () => {
    const template = '<#if false>one<#elseif false>two<#else>three</#if>';

    const result = new TemplateEngine().render(template, {});

    expect(result).toEqual('three');
});

test('directive - if - complex expression', () => {
    const template = '<#if 20 / 5 % 2 == 0>one</#if>';

    const result = new TemplateEngine().render(template, {});

    expect(result).toEqual('one');
});

test('directive - assign - expression version ', () => {
    const template = '<#assign test1 = "one" test2 = "two" >${test1}';

    const result = new TemplateEngine().render(template, {});

    expect(result).toEqual('one');
});

test('directive - assign - template version ', () => {
    const template = '<#assign test1>one</#assign>${test1}';

    const result = new TemplateEngine().render(template, {});

    expect(result).toEqual('one');
});

test('directive - list - as sequence', () => {
    const template = '<#list sequence as item>' +
        'some content for ${item}\n' +
        '</#list>';

    const result = new TemplateEngine().render(template, {
        sequence: [1, 2, 3, 4]
    });

    expect(result).toEqual(
        'some content for 1\n' +
        'some content for 2\n' +
        'some content for 3\n' +
        'some content for 4\n'
    );
});

test('directive - list - as hash', () => {
    const template = '<#list hash as key, value>' +
        'some content for $\{key} - ${value}\n' +
        '</#list>';

    const result = new TemplateEngine().render(template, {
        hash: {
            one: 1,
            two: 2
        }
    });

    expect(result).toEqual(
        'some content for one - 1\n' +
        'some content for two - 2\n'
    );
});

test('directive - list - else', () => {
    const template = '<#list sequence as item>' +
        'some content for ${item}\n' +
        '<#else>\n' +
        'some content when list is empty\n' +
        '</#list>';

    expect(new TemplateEngine().render(template, {
        sequence: [1, 2, 3, 4]
    })).toEqual(
        'some content for 1\n' +
        'some content for 2\n' +
        'some content for 3\n' +
        'some content for 4\n'
    );

    expect(new TemplateEngine().render(template, {
        sequence: []
    })).toEqual(
        '\nsome content when list is empty\n'
    );
});

test('directive - list - items', () => {
    const template = '<#list sequence>' +
        'Part executed once if we have more than 0 items' +
        '<#items as item>' +
        'Part repeated for each item ${item}' +
        '</#items>' +
        'Part executed once if we have more than 0 items' +
        '<#else>' +
        'Part executed when there are 0 items' +
        '</#list>';

    expect(new TemplateEngine().render(template, {
        sequence: [1, 2, 3, 4]
    })).toEqual(
        'Part executed once if we have more than 0 items' +
        'Part repeated for each item 1' +
        'Part repeated for each item 2' +
        'Part repeated for each item 3' +
        'Part repeated for each item 4' +
        'Part executed once if we have more than 0 items');

    expect(new TemplateEngine().render(template, {
        sequence: []
    })).toEqual('Part executed when there are 0 items');
});

test('directive - list over hash - items', () => {
    const template = '<#list hash>' +
        'Part executed once before' +
        '<#items as key, value>' +
        'Part repeated for each item $\{key} - ${value}' +
        '</#items>' +
        'Part executed once after' +
        '<#else>' +
        'Part executed when there are 0 items' +
        '</#list>';

    expect(new TemplateEngine().render(template, {
        hash: { one: 1, two: 2 }
    })).toEqual(
        'Part executed once before' +
        'Part repeated for each item one - 1' +
        'Part repeated for each item two - 2' +
        'Part executed once after');

    expect(new TemplateEngine().render(template, {
        hash: {}
    })).toEqual('Part executed when there are 0 items');
});

test('directive - list - sep', () => {

    expect(new TemplateEngine().render('<#list sequence as item>${item}<#sep>, </#sep></#list>', {
        sequence: [1, 2, 3, 4]
    })).toEqual('1, 2, 3, 4');

    expect(new TemplateEngine().render('<#list sequence as item>${item}<#sep>, </#list>', {
        sequence: [1, 2, 3, 4]
    })).toEqual('1, 2, 3, 4');

    expect(new TemplateEngine().render('<#list sequence as item><#sep>, </#sep>${item}</#list>', {
        sequence: [1, 2, 3, 4]
    })).toEqual('1, 2, 3, 4');

    expect(new TemplateEngine().render('<#list sequence as item>test <#sep>, </#sep>${item}</#list>', {
        sequence: [1, 2, 3, 4]
    })).toEqual('test 1, test 2, test 3, test 4');
});

test('directive - list - list value builtin', () => {
    const template = '<#list sequence as item>' +
        '$\{item} - ${item?item_parity_cap} - ${item?is_last}' +
        '</#list>';

    expect(new TemplateEngine().render(template, {
        sequence: [1, 2, 3, 4]
    })).toEqual(
        '1 - Odd - false' +
        '2 - Even - false' +
        '3 - Odd - false' +
        '4 - Even - true');
});

test('directive - list - nested', () => {
    const template = '<#list sequence as item><#list item as val>' +
        '$\{val} - ${item?item_parity} - ${val?item_parity}\n' +
        '</#list></#list>';

    expect(new TemplateEngine().render(template, {
        sequence: [["one", "two"], ["three", "four"]]
    })).toEqual(
        'one - odd - odd\n' +
        'two - odd - even\n' +
        'three - even - odd\n' +
        'four - even - even\n'
    );
});

test('directive - attempt', () => {
    expect(() => {
        new TemplateEngine().render("<#attempt>", {});
    }).toThrow(ProhibitedError);
});

test('directive - recover', () => {
    expect(() => {
        new TemplateEngine().render("<#recover>", {});
    }).toThrow(ProhibitedError);
});

test('discard error code using if', () => {

    expect(new TemplateEngine().render('<#if false>\n' +
        '${test.test}\n' +
        '<#else>\n' +
        'alternative content\n' +
        '</#if>', {})).toEqual("\nalternative content\n");

    expect(new TemplateEngine().render('<#if true>\n' +
        'alternative content\n' +
        '<#else>\n' +
        '${test.test}\n' +
        '</#if>', {})).toEqual("\nalternative content\n");
});

test('discard error code using list', () => {
    expect(new TemplateEngine().render('<#list []>\n' +
        '${test.test}\n' +
        '<#else>\n' +
        'alternative content\n' +
        '</#list>', {})).toEqual("\nalternative content\n");

    expect(new TemplateEngine().render('<#list [1]>\n' +
        'alternative content\n' +
        '<#else>\n' +
        '${test.test}\n' +
        '</#list>', {})).toEqual("\nalternative content\n");
});

test('discard error code using hash', () => {
    expect(new TemplateEngine().render('<#list {}>\n' +
        '${test.test}\n' +
        '<#else>\n' +
        'alternative content\n' +
        '</#list>', {})).toEqual("\nalternative content\n");

    expect(new TemplateEngine().render('<#list {"one": 1}>\n' +
        'alternative content\n' +
        '<#else>\n' +
        '${test.test}\n' +
        '</#list>', {})).toEqual("\nalternative content\n");
});

test('discard assign using hash', () => {
    expect(new TemplateEngine().render('<#list {}>\n' +
        '<#assign x=1>\n' +
        '<#assign y>2</#assign>\n' +
        '<#else>\n' +
        'alternative content\n' +
        '</#list>', {})).toEqual("\nalternative content\n");
});

test('error  processing assign within if', () => {
    expect(new TemplateEngine().render('<#if size == \'SMALL\'>\n' +
        '    <#assign sizeCls = \'form-control-sm\'>\n' +
        '<#elseif size == \'MEDIUM\'>\n' +
        '    <#assign sizeCls = \'form-control-md\'>\n' +
        '<#elseif size == \'LARGE\'>\n' +
        '    <#assign sizeCls = \'form-control-lg\'>\n' +
        '</#if>', {})).toEqual("");
});


test('error processing list', () => {

    const template = '<#list values as val><#if value?? && value == val.key>checked</#if> ${val.label} </#list>';

    const data = {
        values: [
            { key: '1', label: '1' },
            { key: '2', label: '2' },
            { key: '3', label: '3' },
            { key: '4', label: '4' },
            { key: '5', label: '5' },
            { key: '6', label: '6' },
            { key: '7', label: '7' },
            { key: '8', label: '8' },
            { key: '9', label: '9' },
            { key: '10', label: '10' }
        ],
        value: '4',
    };

    expect(new TemplateEngine().render(template, data)).toEqual(" 1  2  3 checked 4  5  6  7  8  9  10 ");
});

test('directive - switch', () => {
    const template = '<#switch value>\n' +
        '  <#case "one">\n' +
        '    one content\n' +
        '    <#break>\n' +
        '  <#case "two">\n' +
        '    two content\n' +
        '  <#case "three">\n' +
        '    three content\n' +
        '    <#break>\n' +
        '  <#default>\n' +
        '    default content\n' +
        '</#switch>';

    expect(new TemplateEngine().render(template, {
        value: 'one'
    })).toEqual('\n    one content\n    ');

    expect(new TemplateEngine().render(template, {
        value: 'two'
    })).toEqual('\n    two content\n  \n    three content\n    ');

    expect(new TemplateEngine().render(template, {
        value: 'three'
    })).toEqual('\n    three content\n    ');

    expect(new TemplateEngine().render(template, {
        value: 'four'
    })).toEqual('\n    default content\n');

});
